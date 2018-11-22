import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from './tools.service';

@Injectable()
export class CognosService {

  constructor(
    private http: HttpClient,
    private tools: ToolsService
  ) { }

  getCookie(name) {
    const value = "; " + document.cookie
    const parts = value.split("; " + name + "=")
    if (parts.length == 2) return parts.pop().split(";").shift()
  }

  load(): Promise<void> {
    return new Promise(resolve => {
      this.http.get('/internal/bi/v1/ext/0201_DIP_CC/img/DIPLogV_Color_DarkBack.svg', { observe: 'response', responseType: 'text' })
        .subscribe(
          success => {
            this.tools.xsrf_token = this.getCookie('XSRF-TOKEN')
            return resolve()
          },
          err => {
            if (location.hostname.indexOf('corpintra.net') == -1) return resolve()
            const app: HTMLElement = document.querySelector('dip-root')
            app.style.display = 'none'
            const iframe = document.createElement("iframe")
            iframe.style.height = '100%'
            iframe.style.width = '100%'
            iframe.style.border = '0'
            iframe.src = '/internal/bi/?pathRef=.public_folders%2F0201_DIPRE%2FCOCKPIT%2FReportOutputs%2FAMVARA_triggerReport&amp;ui_appbar=false&amp;ui_navbar=false&amp;format=HTML&amp;Download=false'
            document.body.appendChild(iframe)
            window.addEventListener('complete', () => {
              iframe.remove()
              this.tools.xsrf_token = this.getCookie('XSRF-TOKEN')
              app.style.display = ''
              return resolve()
            })
          })
    })
  }
}
