import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cookies-expired',
  templateUrl: './cookies-expired.component.html',
  styleUrls: ['./cookies-expired.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookiesExpiredComponent {

  constructor(
    public dialogRef: MatDialogRef<CookiesExpiredComponent>,
  ) {}

  relogin(): void {
    location.reload();
  }
}
