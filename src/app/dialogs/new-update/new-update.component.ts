import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'new-update',
  templateUrl: './new-update.component.html',
  styleUrls: ['./new-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUpdateComponent {

  reload = () => location.reload(true);

}
