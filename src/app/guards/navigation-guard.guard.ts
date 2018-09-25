import { Injectable } from '@angular/core';
import { CanDeactivate, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';

@Injectable()
export class NavigationGuard implements CanDeactivate<any> {

  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private data: DataService
  ) {}

  canDeactivate(component: any) {
    if (this.data.backButton) {
      switch (this.data.currentLevel) {
        case 3:
          this.router.navigate(['../../../../'], { relativeTo: this.ac, replaceUrl: true })
          break
        case 2:
          console.log("Hola3")
          this.router.navigate(['../../'], { relativeTo: this.ac, replaceUrl: true })
          break
        case 1:
          if (this.data.title != 'order_intake') {
            console.log("Hola2")
            this.router.navigate(['order-intake'], { replaceUrl: true })
          }
      }
      this.data.backButton = false
      return false
    }
    return true
  }
}
