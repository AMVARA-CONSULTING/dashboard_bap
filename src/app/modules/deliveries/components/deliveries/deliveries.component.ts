import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ILanguage } from '@other/interfaces';
import { DateAdapter } from '@angular/material/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { ConfigState } from '@store/config.state';
import { DeliveriesDateAdapter } from '@modules/deliveries/dateadapter/date_adapter';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@services/config.service';
import { shippedToJson } from '@other/functions';

@Component({
  selector: 'deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: DeliveriesDateAdapter}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveriesComponent implements OnInit {

  @HostListener("window:resize", ['$event'])
  private onResize(event) {
    this.isMobile = event.target.innerWidth <= 800;
  }

  @SelectSnapshot(ConfigState.GetLanguage) language: ILanguage;
  shipped: any = {};
  pl: any = [];
  pd: any = [];
  mid: Date;
  mad: Date;
  pm: any = [];
  sp: string;
  sd: string;
  sm: string;
  ddr: Object = {}; 
  dmar: Object = {};
  loaded: boolean;
  isMobile: boolean = window.innerWidth <= 800;

  constructor (
    private ref: ChangeDetectorRef,
    private _adapter: DateAdapter<any>,
    private title: Title,
    private config: ConfigService,
    private http: HttpClient
    ) {
    this.title.setTitle(this.config.config.appTitle + ' - Shipped');
  }

  ngOnInit()  {
    let country = this.language == 'en'? 'GB' : 'DE';
    let _locale = `${this.language}-${country}`;
    this._adapter.setLocale(_locale);
    try {
      this.http.get("assets/reports/KB_Delivery_new.txt")
        .subscribe(data => {
          this.shipped = shippedToJson(data, this.language);
          this.pl = this.getPL(this.shipped);
          this.sp = this.pl[this.pl.length -1];
          this.pd = this.getPD(this.shipped);
          this.setMID();
          this.setMAD();
          this.sd = this.pd[this.pd.length - 1];
          this.pm = this.getPM();
          this.sm = this.pm[this.pm.length - 1];
          this.changeDR();
          this.changeMR();
          this.loaded = true;
          this.ref.detectChanges();
        });
    } catch(err) {
        this.loaded = true;
        this.ref.detectChanges();
    }
  }
  onChangeM(m: string) {
    this.sm = m;
    this.changeMR();
  }
  onChangeP() {
    console.log(this.sp)
    this.pm = this.getPM();
    this.sm = this.pm[this.pm.length - 1];
    this.pd = this.getPD(this.shipped);
    this.setMID();
    this.setMAD();
    this.sd = this.pd[this.pd.length - 1];
    this.changeDR();
    this.changeMR();
  }
  onChangeD(viewDay: string) {
    let currentDateIndex = this.pd.indexOf(this.sd);
    viewDay === 'next' ? this.sd = this.pd[currentDateIndex + 1] : this.sd = this.pd[currentDateIndex - 1];
    this.changeDR();
  }
  changeDR() {
    this.ddr = this.shipped[this.sp][this.sd];
  }
  changeMR() {
    this.dmar = this.shipped[this.sp]['month'].find(months => months.month_id == this.sm);
    this.gvcd();
  }
  isFD(): boolean {
    return this.pd.indexOf(this.sd) === 0 ? true : false;
  }
  isLD(): boolean {
    return this.pd.indexOf(this.sd) === this.pd.length -1 ? true : false;
  }
  gvcd() {
    return { day: this.ddr, month: this.dmar };
  }
  getPL(shipped: any): string[] {
    return Object.keys(shipped);
  }
  getPM() {
    let months: any = [];
    this.shipped[this.sp]["month"].forEach(item => { months.push(item.month_id)});
    return months;
  }
  getPD(shipped: any): string[] {
    let dates: any = [];
    for (const item in shipped[this.sp]) {
      if(item.includes("0")) dates.push(item); 
    }
    return dates;
  }
  setMID() {
    this.mid = this.sTD(this.pd[0]);
  }
  setMAD() {
    this.mad = this.sTD(this.pd[this.pd.length-1]);
  }
  dTS(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }
  sTD(date: any): Date {
    const [day, month, year] = date.split("/");
    return new Date(year, month-1, day);
  }
  onDC(event: Event) {
    this.sd = this.dTS(event["value"]);
    this.changeDR();
  }
  aD = (d: Date | null): boolean => {
    const date = this.dTS(d);
    return this.pd.includes(date);
  };
  getInputSize(input) {
    return input.value.length;
  }
}
