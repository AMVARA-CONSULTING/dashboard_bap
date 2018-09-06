import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectYearData } from '@other/interfaces';

@Component({
  selector: 'select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss']
})
export class SelectYearComponent {

  constructor(
    public dialogRef: MatDialogRef<SelectYearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectYearData ) {}

}
