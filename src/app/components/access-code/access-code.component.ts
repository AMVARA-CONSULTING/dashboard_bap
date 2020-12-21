import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Config } from '@other/interfaces';
import { DataService } from '@services/data.service';
import { ConfigState } from '@store/config.state';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessCodeComponent {
  
  /** Just-In-Time Config State */
  @SelectSnapshot(ConfigState) config !: Config;

  origin = '';
  lang = '';

  rForm: FormGroup;

  constructor(
    private data: DataService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private ac: ActivatedRoute
  ) {
    // Prevent showing access code if we are already in production or Cognos Server
    if (!environment.production || this.config.corpintra) {
      this.data.accessGranted = true;
      this.router.navigate(['/'], { queryParamsHandling: 'merge' });
      return;
    }
    this.ac.queryParamMap.subscribe(params => {
      this.lang = params.get('lang');
      this.origin = params.get('origin');
      const bypass = params.get('bypass');
      if (bypass != null) {
        this.data.accessGranted = true;
        this.router.navigate(['/'], { queryParamsHandling: 'merge' });
      }
    });
    this.rForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'tel': ['', Validators.required]
    });
  }

  codeChange(code): void {
    if (code === 'TheSexiestReport') {
      setTimeout(() => {
        this.data.accessGranted = true;
        localStorage.setItem('accessGranted', 'yes');
        this.router.navigate(['/'], { queryParamsHandling: 'merge' });
      }, 500);
    }
  }

  submit(values): void {
    this.http.post('https://more.amvara.rocks/api/contact/', {
      name: values.name,
      email: values.email,
      tel: values.tel,
      origin: this.origin || 'undefined',
      lang: this.lang || 'undefined'
    }).subscribe((res: any) => {
      this.granted.next(res.success);
      if (res.success) {
        localStorage.setItem('accessGranted', 'yes');
      } else {
        alert('An error ocurred.');
      }
    });
  }

  code = '';

  granted = new BehaviorSubject<boolean>(false);

  stateRegister = false;

}
