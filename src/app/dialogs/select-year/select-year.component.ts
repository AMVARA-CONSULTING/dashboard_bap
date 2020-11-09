import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectYearData } from '@other/interfaces';

@Component({
  selector: 'select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectYearComponent {

  constructor(
    public dialogRef: MatDialogRef<SelectYearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectYearData) { }

}
