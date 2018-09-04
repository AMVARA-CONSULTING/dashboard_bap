import { NgModule } from '@angular/core';
import { NumberPipe } from '@pipes/number.pipe';

@NgModule({
  declarations: [
    NumberPipe
  ],
  exports: [
    NumberPipe
  ]
})
export class SharedModule { }
