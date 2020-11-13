import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CookiesExpiredComponent } from 'app/dialogs/cookies-expired/cookies-expired.component';
import * as moment from 'moment';
import { ToolsService } from './tools.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class ApiService {

  corpintra = false;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private dialog: MatDialog,
    private tools: ToolsService
  ) {
    (window as any).api = this;
    this.corpintra = location.hostname.indexOf('corpintra.net') > -1;
    if (!this.corpintra) {
      const datum = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
      for (let prop in this.reportDates) {
        this.reportDates[prop] = datum
      }
    }
  }

  reportDates = {
    orderIntake: '',
    orderBacklog: '',
    productionProgram: '',
    allocation: '',
    plantStock: ''
  };

  reloadDialog: MatDialogRef<CookiesExpiredComponent>

  openCookiesPopup(): void {
    if (!this.reloadDialog) this.reloadDialog = this.dialog.open(CookiesExpiredComponent, {
      panelClass: 'newUpdate',
      disableClose: true,
      closeOnNavigation: false
    })
  }

  authorized = true;

  heartbeat: Subscription;

  cognosLink(url): string {
    return url.replace('80', '443').replace('http:', 'https:');
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
        this.http.get('assets/reports/Order_Intake.json').pipe(
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
        this.http.get('assets/reports/Allocation.json').pipe(
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
        this.http.get('assets/reports/Plant_Stock.json').pipe(
          // map(data => this.csvToJson(data, this.config.config.reports.trucks.columns.plantStock.shouldBeNumber))
        ).subscribe((res: any[]) => {
          observer.next({ success: true, data: res })
          observer.complete()
        })
      })
    }
  }

  // Get Order Backlog Data from Report (tmp CSV file)
  getOrderBacklogData(ReportID: string) {
    let plandate = '';
    if (this.corpintra) {
      // Get report from Live Server
      return this.http.get<any>(`/internal/bi/v1/objects/${ReportID}/versions`, { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } }).pipe(
        catchError(err => {
          // Catch error on getting info from Report ID
          console.log('Order Backlog - Fail at getting report info.');
          return err;
        }),
        switchMap(json => {
          // Get report versions
          const nextLink = json.data[0]._meta.links.outputs.url;
          return this.http.get<any>(nextLink, { headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } })
        }),
        catchError(err => {
          // Catch error on getting report versions
          console.log('Order Backlog - Fail at getting last report versions.');
          return err;
        }),
        switchMap(json => {
          // Get last saved report content
          const nextLink = json.data[0]._meta.links.content.url;
          plandate = json.data[0].modificationTime;
          return this.http.get(nextLink, { responseType: 'text', headers: { 'X-XSRF-TOKEN': this.tools.xsrf_token } });
        }),
        catchError(err => {
          // Catch error on getting HTML content
          console.log('Order Backlog - Fail at getting report table data');
          return err;
        }),
        map(html => {
          // Convert HTML to JSON and formatting
          return {
            plandate: plandate,
            rows: this.tools.htmlToJson(html, '[lid=AMVARA_DATA_OB] tr')
          };
        })
      );
    } else {
      // Get report from local
      return this.http.get('assets/reports/Order_Backlog.json').pipe(
        map((rows: any[]) => ({ plandate: moment().format('DD/MM/YYYY'), rows: rows }))
      );
    }
  }

  // New csvToJson from MIF code
  newCsvToJson(data): any {
    const rows = [];
    const lines: any[] = data.split('\n');
    const headers = lines.shift().split(';').map(el => el.trim());
    lines.forEach(line => {
      if (line.length > 0) {
        const newRow = {};
        line.split(';').forEach((element, index) => {
          newRow[headers[index]] = element.trim();
        });
        rows.push(newRow);
      }
    });
    return rows;
  }
}
