import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { BacklogColumns, ILanguage, IntakeHistoryColumns } from '@other/interfaces';
import { ConfigState } from '@store/config.state';

@Pipe({
  name: 'distinctItems'
})
export class DistinctItemsPipe implements PipeTransform {

  @SelectSnapshot(ConfigState.GetLanguageHuman) language: ILanguage;
  reportInterface: typeof BacklogColumns | typeof IntakeHistoryColumns;

  constructor(private _ac: ActivatedRoute) {
    let report = this._ac.snapshot.data.title;
    switch (report) {
      case 'order_intake_history':
        this.reportInterface = IntakeHistoryColumns;
        break;
      case 'order_backlog':
      default:
        this.reportInterface = BacklogColumns;
        break;
    }
  }

  transform(rows: any[], type: 'region' | 'product', compareItems: any = null): any {
    if (!rows || rows.length === 0) {
      return {};
    }
    const column = type === 'region' ? this.reportInterface[`Region${this.language}`] : this.reportInterface[`Product${this.language}`];
    const uniques = rows.reduce((r, a) => {
      r[a[column]] = r[a[column]] || [];
      r[a[column]].push(a);
      return r;
    }, {});
    if (compareItems) {
      // If compare object is specified, crossjoin distinct items keys
      for (const key in compareItems) {
        if (compareItems[key]) {
          uniques[key] = uniques[key] || [];
        }
      }
    }
    return uniques;
  }

}