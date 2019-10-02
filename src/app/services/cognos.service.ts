import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from './tools.service';
import { UserPreferences, UserCapabilities, HeaderLink, Config } from '@other/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class CognosService {

  constructor(
    private http: HttpClient,
    private tools: ToolsService
  ) {
    (window as any).cognos = this;
  }

  getCookie(name) {
    const value = "; " + document.cookie
    const parts = value.split("; " + name + "=")
    if (parts.length == 2) return parts.pop().split(";").shift()
  }

  userCapabilities: UserCapabilities

  // Gets the available reports based on the user capabilities object
  getLinksWithAccess(config: Config) {
    let links: HeaderLink[] = [
      { link: '/order-intake', text: 'order_intake' },
      { link: '/production-program', text: 'production_program' },
      { link: '/allocation', text: 'allocation' },
      { link: '/plant-stock', text: 'plant_stock' }
    ]
    if (location.hostname.indexOf('corpintra.net') > -1) {
      const scenarioProperties = Object.assign({}, this.userCapabilities[config.target])
      for (let prop in scenarioProperties) {
        if (!scenarioProperties[prop]) delete scenarioProperties[prop]
      }
      const haveAccessTo = Object.keys(scenarioProperties)
      return links.filter(link => haveAccessTo.indexOf(link.text) > -1)
    } else {
      return links
    }
  }

  load(CapabilitiesReportID, config: Config): Promise<void> {
    return new Promise(resolve => {
      this.http.get('/internal/bi/v1/ext/0201_DIP_CC/img/DIPLogV_Color_DarkBack.svg', { observe: 'response', responseType: 'text' })
        .subscribe(
          success => {
            // Retrieve XSRF Token
            this.tools.xsrf_token = this.getCookie('XSRF-TOKEN')
            this.loadCapabilities(CapabilitiesReportID, resolve, config)
          },
          err => {
            // Login
            if (location.hostname.indexOf('corpintra.net') == -1) return resolve()
            const app: HTMLElement = document.querySelector('dip-root')
            app.style.display = 'none'
            const iframe = document.createElement("iframe")
            iframe.style.height = '100%'
            iframe.style.width = '100%'
            iframe.style.border = '0'
            iframe.src = '/internal/bi/?pathRef=.public_folders%2F0201_DIPRE%2FCOCKPIT%2FReportOutputs%2FAMVARA_triggerReport&amp;ui_appbar=false&amp;ui_navbar=false&amp;format=HTML&amp;Download=false'
            document.body.appendChild(iframe)
            // AMVARA_triggerReport sended login is done
            window.addEventListener('complete', () => {
              this.tools.xsrf_token = this.getCookie('XSRF-TOKEN')
              this.loadCapabilities(CapabilitiesReportID, resolve, config, iframe, app)
            })
          })
    })
  }

  loadCapabilities(CapabilitiesReportID, resolve, config: Config, iframe?, app?) {
    // Do a request to know the preferences and basic info of the logged user
    // Retrieve the report containing a list of users and their permissions to view reports
    this.getUserCapabilities(CapabilitiesReportID)
    .pipe(
      catchError(error => {
        alert("Fail at retrieving permissions list, please contact the system administrator.")
        return of({ success: false, data: []})
      })
    )
    .subscribe(data => {
      if (data.success) {
        let users = data.data
        if (users.length === 0) {
          alert(`Your username was not found in user capabilities list, please contact the system administrator.`)
          return
        }
        const user = users[0]
        if (config.debug) console.log(user)
        this.userCapabilities = {
          admin: user[1] == "1",
          mobile: user[2] == "1",
          trucks: {
            order_intake: user[3] == "1",
            production_program: user[7] == "1",
            allocation: user[9] == "1",
            plant_stock: user[5] == "1"
          },
          vans: {
            order_intake: user[4] == "1",
            production_program: user[8] == "1",
            allocation: user[10] == "1",
            plant_stock: user[6] == "1"
          },
          list: user[11].replace(/\'/g, '').split(',')
        }
        if (config.debug) console.log(this.userCapabilities)
        if (iframe) iframe.remove()
        if (app) app.style.display = ''
        return resolve()
      } else {
        alert("Fail at retrieving permissions list, please contact the system administrator.")
      }
    })
  }
  

  // Get user capabilites retrieving them from Security_Report
  getUserCapabilities(ReportID): Observable<{ success: boolean, data?: any[], error?: string, more?: any }> {
    if (location.hostname.indexOf('corpintra.net') > -1) {
      return new Observable(observer => {
        this.http.get(`/internal/bi/v1/disp/rds/reportData/report/${ReportID}?fmt=HTMLFragment`, { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((data: any) => {
          const rows = this.tools.htmlToJson(data, '[lid=List1] tr')
          observer.next({ success: true, data: rows })
          observer.complete()
        }, err => {
          observer.next({ success: false, data: [], error: 'CAP - Fail at retrieving report info.', more: err })
          observer.complete()
        })
      })
    } else {
      // Nothing to do here, yet
    }
  }
}
