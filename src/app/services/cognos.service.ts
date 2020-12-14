import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from './tools.service';
import { UserCapabilities, HeaderLink, Config } from '@other/interfaces';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ConfigState } from '@store/config.state';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from 'app/dialogs/login/login.component';

@Injectable()
export class CognosService {

  @SelectSnapshot(ConfigState) config: Config;

  constructor(
    private http: HttpClient,
    private tools: ToolsService,
    private _dialog: MatDialog
  ) {
    (window as any).cognos = this;
  }

  getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift()
  }

  userCapabilities = new BehaviorSubject<UserCapabilities>(null);

  // Gets the available reports based on the user capabilities object
  getLinksWithAccess() {
    const links: HeaderLink[] = [
      { link: '/order-intake', text: 'order_intake' },
      { link: '/order-backlog', text: 'order_backlog'},
      { link: '/production-program', text: 'production_program' },
      { link: '/allocation', text: 'allocation' },
      { link: '/plant-stock', text: 'plant_stock' }
    ].filter(link => this.config.enableReports[link.text]);
    if (location.hostname.indexOf('corpintra.net') > -1) {
      const scenarioProperties = { ...this.userCapabilities.getValue()[this.config.target] };
      for (const prop in scenarioProperties) {
        if (!scenarioProperties[prop]) delete scenarioProperties[prop]
      }
      const haveAccessTo = Object.keys(scenarioProperties);
      return links.filter(link => haveAccessTo.indexOf(link.text) > -1);
    } else {
      return links;
    }
  }

  doLogin(config: Config, namespace: string, user: string, password: string) {
    return this.http.post(`${config.apiDomain}${config.apiLink}login`, {
      parameters: [
        { name: 'CAMNamespace', value: namespace },
        { name: 'h_CAM_action', value: 'logonAs' },
        { name: 'CAMUsername', value: user },
        { name: 'CAMPassword', value: password }
      ]
    }, {
      observe: 'response',
      params: {
        skipInterceptor: 'yes',
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  }

  load(CapabilitiesReportID, config: Config): Promise<void> {
    return new Promise(resolve => {
      this.http.get(`${config.apiDomain}${config.apiLink}ext/0201_DIP_CC/img/DIPLogV_Color_DarkBack.svg`, {
        responseType: 'text',
        observe: 'response',
        params: {
          skipInterceptor: 'yes',
          'ngsw-bypass': '1', // Bypass Service Worker Cache
          'cache-bust': (new Date()).getTime().toString() // Cache busting parameter
        }
      })
      .subscribe(
          success => {
            // Retrieve XSRF Token
            this.tools.xsrf_token = this.getCookie('XSRF-TOKEN');
            this.loadCapabilities(resolve, config);
          },
          err => {
            // Login
            if (localStorage.getItem('newLogin') === 'true') {
              // Trigger XSRF Token cookie generation
              this.http.get(`${config.apiDomain}${config.portal}`, {
                responseType: 'text',
                params: {
                  'ngsw-bypass': '1', // Bypass Service Worker Cache
                  'cache-bust': (new Date()).getTime().toString() // Cache busting parameter
                }
              }).subscribe(_ => {
                this._dialog.open(LoginDialog, {
                  panelClass: 'login-panel',
                  backdropClass: 'login-backdrop',
                  disableClose: true
                }).afterClosed().subscribe(result => {
                  this.doLogin(config, 'EMEA', result.user, result.password).subscribe(data => {
                    this.tools.xsrf_token = this.getCookie('XSRF-TOKEN');
                    this.loadCapabilities(resolve, config);
                  }, err => {
                    console.log('Something went wrong while logging in ... see details below:');
                    console.log(err);
                  });
                });
              });
            } else {
              this.doLoginWithIframe(resolve, config);
            }
          });
    });
  }

  doLoginWithIframe(resolve, config: Config) {
    const app: HTMLElement = document.querySelector('dip-root');
    app.style.display = 'none';
    const iframe = document.createElement('iframe');
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.style.border = '0';
    const _this = this;
    iframe.onload = function() {
      // Manually add DaimlerLoginCSS to login iframe
      _this.addCSStoLogin(location.protocol + '//' + location.host + location.pathname + 'assets/css/custom_login.css');
    };
    iframe.src = `${config.portal}?pathRef=.public_folders%2F0201_DIPRE%2FCOCKPIT%2FReportOutputs%2FAMVARA_triggerReport&ui_appbar=false&ui_navbar=false&format=HTML&Download=false`;
    document.body.appendChild(iframe);
    // AMVARA_triggerReport sended login is done
    window.addEventListener('complete', () => {
      this.tools.xsrf_token = this.getCookie('XSRF-TOKEN');
      this.loadCapabilities(resolve, config, iframe, app);
    });
  }

  addCSStoLogin(cssFile: string) {
    const head = window.frames[0].document.getElementsByTagName('head')[0];
    const link = window.frames[0].document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssFile;
    head.appendChild(link);
  }

  loadCapabilities(resolve, config: Config, iframe?, app?) {
    // Do a request to know the preferences and basic info of the logged user
    // Retrieve the report containing a list of users and their permissions to view reports
    this.getUserCapabilities(config)
    .pipe(
      catchError(error => {
        alert('Fail at retrieving permissions list, please contact the system administrator.');
        return of({ success: false, data: []});
      })
    )
    .subscribe(data => {
      if (data.success) {
        let rows = data.data.reduce((r, a) => {
          const re = new RegExp(/CAMID\(\"\:0201_DIPRE\:_(.*)\"\)/g);
          const match = re.exec(a.searchPath);
          if (match) {
            r.push(match[1]);
          }
          return r;
        }, []);
        this.userCapabilities.next({
          admin: rows.some(permission => permission.toLowerCase() === 'Global_Function_Groups‬:DIPRE_Admins'.toLowerCase()),
          mobile: rows.some(permission => permission.toLowerCase() === 'Global_Function_Groups‬:DIPRE_Mobile'.toLowerCase()),
          trucks: {
            order_intake: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_Truck_Management_Order Intake'.toLowerCase()),
            order_backlog: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_Truck_Management_Order_Back_Log'.toLowerCase()),
            production_program: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_Truck_Management_Production Program'.toLowerCase()),
            allocation: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_Truck_Management_Allocation'.toLowerCase()),
            plant_stock: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_Truck_Management_Plant Stock'.toLowerCase())
          },
          vans: {
            order_intake: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_VAN_Management_Order Intake'.toLowerCase()),
            order_backlog: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_Van_Management_Order_Back_Log'.toLowerCase()),
            production_program: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_VAN_Management_Production Program'.toLowerCase()),
            allocation: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_VAN_Management_Allocation'.toLowerCase()),
            plant_stock: rows.some(permission => permission.toLowerCase() === 'Project_Function_Groups:Management Function:DIPRE_VAN_Management_Plant Stock'.toLowerCase())
          }
        });
        if (config.debug && this.userCapabilities.getValue().admin) console.log(this.userCapabilities.getValue())
        if (iframe) iframe.remove()
        if (app) app.style.display = '';
        return resolve();
      } else {
        alert('Fail at retrieving permissions list, please contact the system administrator.');
      }
    });
  }

  // Get user capabilites retrieving them from Security_Report
  getUserCapabilities(config: Config): Observable<{ success: boolean, data?: any[], error?: string, more?: any }> {
    if (location.hostname.indexOf('corpintra.net') > -1) {
      return new Observable(observer => {
        this.http.get<any>(`${config.apiLink}identity`, {
          headers: {
            'X-XSRF-TOKEN': this.tools.xsrf_token,
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).subscribe(rows => {
          observer.next({ success: true, data: rows.data });
          observer.complete();
        }, err => {
          observer.next({ success: false, data: [], error: 'CAP - Fail at retrieving report info.', more: err });
          observer.complete();
        });
      });
    } else {
      // Nothing to do here, yet
    }
  }
}
