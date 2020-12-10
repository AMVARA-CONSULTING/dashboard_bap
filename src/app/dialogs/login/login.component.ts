import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dip-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialog {

  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    private _fb: FormBuilder
  ) {
    this.loginForm = this._fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(values) {
    this.dialogRef.close(values);
  }

}
