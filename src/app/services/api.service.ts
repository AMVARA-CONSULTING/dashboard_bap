import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ConfigService } from './config.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CookiesExpiredComponent } from 'app/dialogs/cookies-expired/cookies-expired.component';
import * as moment from 'moment';
import { ToolsService } from './tools.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ApiService {

  corpintra: boolean = false

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private dialog: MatDialog,
    private tools: ToolsService
  ) {
    (window as any).api = this;
    this.corpintra = location.hostname.indexOf('corpintra.net') > -1
    if (!this.corpintra) {
      const datum = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
      for (let prop in this.reportDates) {
        this.reportDates[prop] = datum
      }
    }
  }

  reportDates = {
    orderIntake: '',
    productionProgram: '',
    allocation: '',
    plantStock: ''
  }

  reloadDialog: MatDialogRef<CookiesExpiredComponent>

  openCookiesPopup(): void {
    if (!this.reloadDialog) this.reloadDialog = this.dialog.open(CookiesExpiredComponent, {
      panelClass: 'newUpdate',
      disableClose: true,
      closeOnNavigation: false
    })
  }

  authorized: boolean = true

  heartbeat: Subscription

  cognosLink(url): string {
    return url.replace('80', '443').replace('http:', 'https:')
  }

  /**
   * Function to convert CSV string data to JSOn Array data
   * @param csv string csv data
   * @param numeralFields array of indexes which should parsed as numeral
   * @param removeHeaders provide true to remove first line of headers
   */
  csvToJson(csv: any, numeralFields: number[], removeHeaders: boolean = true) {
    const lines: any[] = csv.split("\n")
    const data = []
    if (removeHeaders) lines.splice(0, 1)
    const length = lines.length
    let i = 1
    for ( ; i < length; i++ ) {
      // Remove empty lines
      if (lines[i].trim().length == 0) continue
      const values = lines[i].split("\t")
      numeralFields.forEach(num => {
        values[num] = isNaN(values[num]) ? 0 : parseFloat(values[num])
      })
      data.push(values)
    }
    return data
  }

  // Get Order Intake Data from Report (temporarily from JSON File)
  getOrderIntakeData(ReportID: string): Observable<{ success: boolean, data?: any[], error?: string, more?: any }> {
    if (this.corpintra) {
      return new Observable(observer => {
        this.http.get('/internal/bi/v1/objects/' + ReportID + '/versions', { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((json: any) => {
          const nextLink = json.data[0]._meta.links.outputs.url
          this.http.get(nextLink, { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((json: any) => {
            const nextLink = json.data[0]._meta.links.content.url
            this.reportDates.orderIntake = json.data[0].modificationTime
            this.http.get(nextLink, { responseType: 'text', headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe(data => {
              const rows = this.tools.htmlToJson(data, '[lid=AMVARA_DATA_OI] tr')
              rows.forEach((row, index, rows) => {
                this.config.config.reports.trucks.columns.orderIntake.shouldBeNumber.forEach(num => {
                  rows[index][num] = isNaN(rows[index][num]) ? 0 : parseFloat(rows[index][num])
                })
              })
              observer.next({ success: true, data: rows })
              observer.complete()
            }, err => {
              observer.next({ success: false, data: [], error: 'OI - Fail at getting report table data.', more: err })
              observer.complete()
            })
          }, err => {
            observer.next({ success: false, data: [], error: 'OI - Fail at getting last report versions.', more: err })
            observer.complete()
          })
        }, err => {
          observer.next({ success: false, data: [], error: 'OI - Fail at retrieving report info.', more: err })
          observer.complete()
        })
      })
    } else {
      return new Observable(observer => {
        this.http.get('assets/reports/order_intake.json').pipe(
          // map(data => this.csvToJson(data, this.config.config.reports.trucks.columns.orderIntake.shouldBeNumber))
        ).subscribe((res: any[]) => {
          observer.next({ success: true, data: res })
          observer.complete()
        })
      })
    }
  }
  // Get Production Program Data from Report (tmp JSON file)
  getProductionProgramData(ReportID: string): Observable<{ success: boolean, data?: any[], error?: string, more?: any }> {
    if (this.corpintra) {
      return new Observable(observer => {
        this.http.get('/internal/bi/v1/objects/' + ReportID + '/versions', { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((json: any) => {
          const nextLink = json.data[0]._meta.links.outputs.url
          this.http.get(nextLink, { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((json: any) => {
            const nextLink = json.data[0]._meta.links.content.url
            this.reportDates.productionProgram = json.data[0].modificationTime
            this.http.get(nextLink, { responseType: 'text', headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe(data => {
              const rows = this.tools.htmlToJson(data, '[lid=Liste1] tr')
              rows.forEach((row, index, rows) => {
                this.config.config.reports.trucks.columns.productionProgram.shouldBeNumber.forEach(num => {
                  rows[index][num] = isNaN(rows[index][num]) || !rows[index][num] ? 0 : parseFloat(rows[index][num])
                })
              })
              observer.next({ success: true, data: rows })
              observer.complete()
            }, err => {
              observer.next({ success: false, data: [], error: 'PP - Fail at getting report table data.', more: err })
              observer.complete()
            })
          }, err => {
            observer.next({ success: false, data: [], error: 'PP - Fail at getting last report versions.', more: err })
            observer.complete()
          })
        }, err => {
          observer.next({ success: false, data: [], error: 'PP - Fail at retrieving report info.', more: err })
          observer.complete()
        })
      })
    } else {
      return new Observable(observer => {
        this.http.get('assets/reports/Planning.json').pipe(
          // map(data => this.csvToJson(data, this.config.config.reports.trucks.columns.productionProgram.shouldBeNumber))
        ).subscribe((res: any[]) => {
          observer.next({ success: true, data: res })
          observer.complete()
        })
      })
    }
  }

  // Get Allocation Data from Report (tmp JSON file)
  getAllocationData(ReportID: string): Observable<{ success: boolean, data?: any[], error?: string, more?: any }> {
    if (this.corpintra) {
      return new Observable(observer => {
        this.http.get('/internal/bi/v1/objects/' + ReportID + '/versions', { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((json: any) => {
          const nextLink = json.data[0]._meta.links.outputs.url
          this.http.get(nextLink, { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((json: any) => {
            const nextLink = json.data[0]._meta.links.content.url
            this.reportDates.allocation = json.data[0].modificationTime
            this.http.get(nextLink, { responseType: 'text', headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe(data => {
              const rows = this.tools.htmlToJson(data, '[lid=Final] tr')
              rows.forEach((row, index, rows) => {
                rows[index][17] = rows[index][17].toString().replace('-', '')
                this.config.config.reports.trucks.columns.allocation.shouldBeNumber.forEach(num => {
                  rows[index][num] = isNaN(rows[index][num]) ? 0 : parseFloat(rows[index][num])
                })
              })
              observer.next({ success: true, data: rows })
              observer.complete()
            }, err => {
              observer.next({ success: false, data: [], error: 'ALOC - Fail at getting report table data.', more: err })
              observer.complete()
            })
          }, err => {
            observer.next({ success: false, data: [], error: 'ALOC - Fail at getting last report versions.', more: err })
            observer.complete()
          })
        }, err => {
          observer.next({ success: false, data: [], error: 'ALOC - Fail at retrieving report info.', more: err })
          observer.complete()
        })
      })
    } else {
      return new Observable(observer => {
        this.http.get('assets/reports/allocation.json').pipe(
          // map(data => this.csvToJson(data, this.config.config.reports.trucks.columns.allocation.shouldBeNumber))
        ).subscribe((res: any[]) => {
          observer.next({ success: true, data: res })
          observer.complete()
        })
      })
    }
  }

  // Get Plant Stock Data from Report (tmp JSON file)
  getPlantStockData(ReportID: string): Observable<{ success: boolean, data?: any[], error?: string, more?: any }> {
    if (this.corpintra) {
      return new Observable(observer => {
        this.http.get('/internal/bi/v1/objects/' + ReportID + '/versions', { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((json: any) => {
          const nextLink = json.data[0]._meta.links.outputs.url
          this.http.get(nextLink, { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe((json: any) => {
            const nextLink = json.data[0]._meta.links.content.url
            this.reportDates.plantStock = json.data[0].modificationTime
            this.http.get(nextLink, { responseType: 'text', headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).subscribe(data => {
              const rows = this.tools.htmlToJson(data, '[lid=AMVARA_DATA_PS] tr')
              rows.forEach((row, index, rows) => {
                this.config.config.reports.trucks.columns.plantStock.shouldBeNumber.forEach(num => {
                  rows[index][num] = isNaN(rows[index][num]) ? 0 : parseFloat(rows[index][num])
                })
              })
              observer.next({ success: true, data: rows })
              observer.complete()
            }, err => {
              observer.next({ success: false, data: [], error: 'PS - Fail at getting report table data.', more: err })
              observer.complete()
            })
          }, err => {
            observer.next({ success: false, data: [], error: 'PS - Fail at getting last report versions.', more: err })
            observer.complete()
          })
        }, err => {
          observer.next({ success: false, data: [], error: 'PS - Fail at retrieving report info.', more: err })
          observer.complete()
        })
      })
    } else {
      return new Observable(observer => {
        this.http.get('assets/reports/plant_stock.json').pipe(
          // map(data => this.csvToJson(data, this.config.config.reports.trucks.columns.plantStock.shouldBeNumber))
        ).subscribe((res: any[]) => {
          observer.next({ success: true, data: res })
          observer.complete()
        })
      })
    }
  }
}
