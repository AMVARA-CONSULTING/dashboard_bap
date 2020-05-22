import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitcherComponent {

  constructor(
    public _data: DataService
  ) { }

  @HostListener('click', ['$event'])
  onClick(e) {
    this._data.lightTheme.setValue(!this._data.lightTheme.value);
  }

}
