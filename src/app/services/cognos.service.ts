import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCapabilities, HeaderLink, Config } from '@other/interfaces';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ConfigState } from '@store/config.state';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from 'app/dialogs/login/login.component';
import { InterceptorParams } from 'ngx-network-error';

@Injectable()
export class CognosService {

  /** Just-In-Time Config selector */
  @SelectSnapshot(ConfigState) config: Config;

  constructor(
    private http: HttpClient,
    private _dialog: MatDialog
  ) {
    (window as any).cognos = this;
  }

  // Object containing user capabilities, null in development
  userCapabilities = new BehaviorSubject<UserCapabilities>(null);

  /**
   * Gets the available reports based on the user capabilities object
  */
  getLinksWithAccess() {
    // Retrieve links from config and filter by enabled object
    const links: HeaderLink[] = this.config.reportLinks.filter(link => this.config.enableReports[link.text]);
    // Check for permissions to every report in Production
    if (this.config.corpintra) {
      // Retrieve user capabilities for the current target
      const scenarioProperties = { ...this.userCapabilities.getValue()[this.config.target] };
      for (const prop in scenarioProperties) {
        // Delete report keys without access
        if (!scenarioProperties[prop]) delete scenarioProperties[prop]
      }
      // Filter links by user capabilities
      const haveAccessTo = Object.keys(scenarioProperties);
      return links.filter(link => haveAccessTo.indexOf(link.text) > -1);
    } else {
      // Return links without filter in Development
      return links;
    }
  }

  /**
   * Does Async login into Cognos using Config parameters
   * @param config Config object from ConfigService or ConfigState
   * @param namespace Namespace to login in
   * @param user Username to login in
   * @param password Password to Login in
   * @returns Observable<HttpResponse<any>>
   */
  doLogin(config: Config, namespace: string, user: string, password: string) {
    return this.http.post<any>(`${config.apiDomain}${config.apiLink}login`, {
      parameters: [
        // Cognos Login specific parameters
        { name: 'CAMNamespace', value: namespace },
        { name: 'h_CAM_action', value: 'logonAs' },
        { name: 'CAMUsername', value: user },
        { name: 'CAMPassword', value: password }
      ]
    }, {
      observe: 'response',
      // Skip interceptor of errors
      params: new InterceptorParams({
        retry: {
          count: 2
        }
      }),
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  }

  /**
   * Function to initialize App requesting a secured item and providing loginForm depending on repsonse with
   * @param config ConfigService (automatic)
   */
  load(config: Config): Promise<void> {
    return new Promise(resolve => {
      // Check user session validity by accessing internal file
      // console.log("AMVARA:============> newLogin.value: ", this.config.newLogin["value"], localStorage.getItem('newLogin'))

      // this variable defines, if the newLoginForm is shown or not, default is "use old loginForm"
      var showOldLoginForm = true

      // If localStorage newLogin is true or common_config newLogin is true
      if (localStorage.getItem('newLogin') === 'true' || this.config.newLogin["value"] === 'true') {
        // enable newLoginForm by setting showOldLoginForm=false
        showOldLoginForm = false
      }

      this.http.get(`${config.apiDomain}${config.apiLink}ext/0201_DIP_CC/img/DIPLogV_Color_DarkBack.svg`, {
        responseType: 'text',
        observe: 'response',
        // Bypass any cache
        params: new InterceptorParams({
          // Only make XHR go through error interceptor if newLogin is enabled
          // Because will be enabled a Login Dialog will be shown automatically
          // newLogin can be set in config_common.json or localStorage
          ...(
            (showOldLoginForm) && { skipInterceptor: true }
            ),
          ignoreDiskCache: true,
          ignoreServiceWorkerCache: true,
          ignoreProxyCache: true
        })
      })
      .subscribe(
          success => {
            // Load user capabilities and continue App load process
            this.loadCapabilities(resolve, config);
          },
          err => {
            // console.log("AMVARA: ===> err onLoading")
            // Login
            /* if (localStorage.getItem('newLogin') === 'true') {
              // Trigger XSRF Token cookie generation
              this.http.get(`${config.apiDomain}${config.portal}`, {
                responseType: 'text',
                // Bypass any cache
                params: new InterceptorParams({
                  ignoreDiskCache: true,
                  ignoreProxyCache: true,
                  ignoreServiceWorkerCache: true
                })
              }).subscribe(_ => {
                // Open Login Dialog
                this._dialog.open(LoginDialog, {
                  panelClass: 'login-panel',
                  backdropClass: 'login-backdrop',
                  disableClose: true
                }).afterClosed().subscribe(result => {
                  // Use Login values to Login into Cognos with XHR
                  this.doLogin(config, 'EMEA', result.user, result.password).subscribe(data => {
                    // Load user capabilities and continue App load process
                    this.loadCapabilities(resolve, config);
                  }, err => {
                    console.log('Something went wrong while logging in ... see details below:');
                    console.log(err);
                  });
                });
              });
            } else { */
              // If new login is disabled, use old method with iframe to log in
              this.doLoginWithIframe(resolve, config);
            //}
          });
    });
  }

  /**
   * Does login with iframe method using the triggerReport stored in DIP Cognos Environment
   *
   * This method is ok for Cognos 11.0.x environments, but very slow on Cognos 11.1.x environments as IBM changed the way of loading elements
   *
   * @param resolve 
   * @param config 
   */
  doLoginWithIframe(resolve, config: Config) {
    // Create iframe with style parameters and url
    // console.log("AMVARA: loginForm")
    const app: HTMLElement = document.querySelector('dip-root');
    app.style.display = 'none';
    const iframe = document.createElement('iframe');
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.style.border = '0';
    const _this = this;
    // Set onload callback
    iframe.onload = function() {
      // Manually add DaimlerLoginCSS to login iframe
      _this.addCSStoLogin(location.protocol + '//' + location.host + location.pathname + 'assets/css/custom_login.css');
    };
    // Set iframe URL
    iframe.src = `${config.portal}?pathRef=.public_folders%2F0201_DIPRE%2FCOCKPIT%2FReportOutputs%2FAMVARA_triggerReport&ui_appbar=false&ui_navbar=false&format=HTML&Download=false`;
    document.body.appendChild(iframe);
    // AMVARA_triggerReport sended login is done
    window.addEventListener('complete', () => {
      // Load user capabilities and continue App load process
      this.loadCapabilities(resolve, config, iframe, app);
    });
  }

  /**
   * Adds a custom CSS file to current login iframe
   * @param cssFile URL of CSS file
   */
  addCSStoLogin(cssFile: string) {
    const head = window.frames[0].document.getElementsByTagName('head')[0];
    const link = window.frames[0].document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssFile;
    head.appendChild(link);
  }

  /**
   * Loads the user capabilities array and sets reports access
   * @param resolve callback of parent .load()
   * @param config ConfigService or ConfigState
   * @param iframe reference to login iframe
   * @param app reference to dip-root
   */
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
        // Filter array by our App DIPRE
        let rows = data.data.reduce((r, a) => {
          const re = new RegExp(/CAMID\(\"\:0201_DIPRE\:_(.*)\"\)/g);
          const match = re.exec(a.searchPath);
          if (match) {
            r.push(match[1]);
          }
          return r;
        }, []);
        // Set user capabilities object values by name
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
        // Remove login iframe if provided
        if (iframe) iframe.remove()
        // Show App layer if provided
        if (app) app.style.display = '';
        return resolve();
      } else {
        alert('Fail at retrieving permissions list, please contact the system administrator.');
      }
    });
  }

  // Get user capabilites retrieving them from Security_Report
  getUserCapabilities(config: Config): Observable<{ success: boolean, data?: any[], error?: string, more?: any }> {
    if (config.corpintra) {
      return new Observable(observer => {
        // Return XHR of user capabilities
        this.http.get<any>(`${config.apiDomain}${config.apiLink}identity`).subscribe(rows => {
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
