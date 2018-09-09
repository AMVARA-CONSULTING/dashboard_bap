import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // Get Order Intake Data from Report (temporarily from JSON File)
  getOrderIntakeData(ReportID?: string) : Observable<any[][]> {
    return this.http.get<any[][]>('assets/reports/order_intake.fake.json')
  }

  // Get Production Program Data from Report (tmp JSON file)
  getProductionProgramData(ReportID?: string) : Observable<any[][]> {
    return this.http.get<any[][]>('assets/reports/production_program.fake.json')
  }
}
