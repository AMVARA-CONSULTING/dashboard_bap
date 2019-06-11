import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessCodeComponent implements OnInit {

  origin = ''
  lang = ''

  rForm: FormGroup

  constructor(
    private data: DataService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private ac: ActivatedRoute
  ) {
    const grantedDomains = ['ibiss-analytics-int.es.corpintra.net', 'ibiss-analytics.es.corpintra.net']
    if (grantedDomains.indexOf(location.hostname) > -1) {
      this.data.accessGranted = true
      this.router.navigate(['/'], { queryParamsHandling: 'merge' })
      return
    }
    if (!environment.production) {
      this.data.accessGranted = true
      this.router.navigate(['/'], { queryParamsHandling: 'merge' })
      return
    }
    this.ac.queryParamMap.subscribe(params => {
      this.lang = params.get('lang')
      this.origin = params.get('origin')
      let bypass = params.get('bypass')
      if (bypass != null) {
        this.data.accessGranted = true
        this.router.navigate(['/'], { queryParamsHandling: 'merge' })
      }
    })
    this.rForm = this.stateRegisterfb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'tel': ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  codeChange(code): void {
    if (code == 'TheSexiestReport') {
      setTimeout(() => {
        this.data.accessGranted = true
        localStorage.setItem('accessGranted', 'yes')
        this.router.navigate(['/'], { queryParamsHandling: 'merge' })
      }, 500)
    }
  }

  submit(values): void {
    this.http.post('/api/contact/', {
      name: values.name,
      email: values.email,
      tel: values.tel,
      origin: this.origin,
      lang: this.lang
    }).subscribe((res: any) => {
      if (res.success) {
        this.granted = true
        localStorage.setItem('accessGranted', 'yes')
      } else {
        this.granted = false
        this.snack.open('An error ocurred.', 'OK')
      }
    })
  }

  code: string = ''

  granted: boolean = false

  stateRegister: boolean = false

}
