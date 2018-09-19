import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { delay } from  'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // Get Order Intake Data from Report (temporarily from JSON File)
  getOrderIntakeData(ReportID?: string) : Observable<any[][]> {
    return this.http.get<any[][]>('assets/reports/order_intake.fake.json').pipe(delay(650))
  }

  // Get Production Program Data from Report (tmp JSON file)
  getProductionProgramData(ReportID?: string) : Observable<any[][]> {
    return this.http.get<any[][]>('assets/reports/production_program.fake.json').pipe(delay(650))
  }

  // Get Allocation Data from Report (tmp JSON file)
  getAllocationData(ReportID?: string) : Observable<any[][]> {
    return this.http.get<any[][]>('assets/reports/allocation.fake.json').pipe(delay(650))
  }

  // Get Plant Stock Data from Report (tmp JSON file)
  getPlantStockData(ReportID?: string) : Observable<any[][]> {
    return this.http.get<any[][]>('assets/reports/plant_stock.json').pipe(delay(650))
  } 
}
