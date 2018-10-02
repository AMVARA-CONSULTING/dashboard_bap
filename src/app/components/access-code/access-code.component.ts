import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss']
})
export class AccessCodeComponent implements OnInit {

  rForm: FormGroup

  constructor (
    private data: DataService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private ac: ActivatedRoute
  ) {
    this.ac.queryParamMap.subscribe(params => {
      let bypass = params.get('bypass')
      if (bypass != null) {
        this.data.accessGranted = true
        this.router.navigate(['/'])
      }
    })
    this.rForm = fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'tel': ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  codeChange(code) : void {
    if (code == 'TheSexiestReport') {
      setTimeout(() => {
        this.data.accessGranted = true
        this.router.navigate(['/'])
      }, 500)
    }
  }

  submit(values) : void {
    this.http.post('/api/contact/', {
      name: values.name,
      email: values.email,
      tel: values.tel
    }).subscribe((res: any) => {
      console.log(res)
      if (res.success) {
        this.granted = true
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
