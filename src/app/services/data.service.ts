import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectYearComponent } from '../dialogs/select-year/select-year.component';
import { ConnectionService } from 'ng-connection-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CognosService } from './cognos.service';

@Injectable()
export class DataService {

  // Determines if the sidenav is opened
  sidenavOpened = new BehaviorSubject<boolean>(false);

  lightTheme = new FormControl(false);

  constructor(
    private dialog: MatDialog,
    private connection: ConnectionService,
    private router: Router,
    private ac: ActivatedRoute,
    private _cognos: CognosService,
    private _breakpoints: BreakpointObserver
  ) {
    (window as any).data = this;
  }

  // Handle swipe page change using origin page
  goFrom(fromPage: string, swipeAction: any): void {
    // Get available links
    const links = [
      ...this._cognos.getLinksWithAccess(),
      { link: '/about', text: 'about' },
      { link: '/help', text: 'help' }
    ];
    // Find current page link
    const currentPageIndex = links.findIndex(link => link.text === fromPage);
    let link;
    if (swipeAction.type === 'swipeleft') {
      // Go to next report
      if (currentPageIndex === links.length - 1) {
        link = links[0];
      } else {
        link = links[currentPageIndex + 1];
      }
    } else {
      // Go to previous report
      if (currentPageIndex === 0) {
        link = links[links.length - 1];
      } else {
        link = links[currentPageIndex - 1];
      }
    }
    this.router.navigate([link.link], { queryParamsHandling: 'merge' });
  }

  init() {
    this.connection.monitor().subscribe(isConnected => {
      this.online = isConnected;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.title = this.ac.root.firstChild.snapshot.data['title']
    });
  }

  mobile$ = this._breakpoints.observe([
    Breakpoints.Handset,
    Breakpoints.TabletPortrait
  ]).pipe(
    map(result => result.matches)
  );

  accessGranted: boolean = false

  currentLevel: number = 0

  backButton: boolean = false

  // Order Intake - All rows without filters
  orderIntakeData: any[][] = []

  // Production Program - All rows without filters
  productionProgramData: any[][] = []

  // Allocation - All rows without filters
  allocationData: any[][] = []

  // Plant Stock - All rows without filters
  plantStockData: any[][] = []

  // Indicates if the user has active internet connection
  online: boolean = true

  // Contains the title of the current page
  title: string = '';

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
