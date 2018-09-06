import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectYearComponent } from '../dialogs/select-year/select-year.component';

@Injectable()
export class DataService {

  constructor(private dialog: MatDialog) { }

  // Determines if the sidenav is opened
  sidenavOpened: boolean = false

  // Order Intake - All rows without filters
  orderIntakeData: any[][] = []

  // Production Program - All rows without filters
  productionProgramData: any[][] = []

  // Allocation - All rows without filters
  allocationData: any[][] = []

  // Plant Stock - All rows without filters
  plantStockData: any[][] = []

  /**
   * Classifies an array collection based on an index
   * @param array An array containing other arrays
   * @param index A number defining the index of the desired value to pivoting
   */
  classifyByIndex(array: any[], index: number) : any {
    return array.reduce((r,a) => {
      r[a[index]] = r[a[index]] || []
      r[a[index]].push(a)
      return r
    }, {})
  }

  /**
   * Sums values of an array collection
   * @param array An array containing other arrays
   * @param i A number defining the index of the desired value to make the sum
   */
  sumByIndex(array: any[], i: number) : any {
    return array.reduce((a,b) => a + b[i], 0)
  }

  // Little Object to know if we can forward to lvl2/lvl3
  lastTap
  lastTap2

  selectYear(year: string, years: string[]) : Promise<string> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(SelectYearComponent, {
        width: '235px',
        data: {
          years: years,
          year: year
        },
        panelClass: 'darker-dialog'
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const newYear = dialogRef.componentInstance.data.year
          if (newYear != year) {
            resolve(newYear)
          } else {
            reject()
          }
        } else {
          reject()
        }
      }, err => reject())
    })
  }
}
