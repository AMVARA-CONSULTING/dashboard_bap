import { Injectable } from '@angular/core';
import { CanDeactivate, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanDeactivate<any> {
  
  constructor(
    private data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  returnToMain() {
    this.router.navigate(['/'], { replaceUrl: true })
    history.pushState({}, '', 'main')
  }

  canDeactivate(component: any) {
    
    if (this.data.backButton) {
      this.data.backButton = false
      // push current state again to prevent further attempts.
      history.pushState(null, null, location.href)
      console.log(this.data.currentLevel)
      switch (this.data.currentLevel) {
        case 3:
          console.log("Level Up from lvl 3")
          this.router.navigate(['../../../../'], { relativeTo: this.activatedRoute, replaceUrl: true })
          break
        case 2:
          console.log("Level Up from lvl 2")
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute, replaceUrl: true })
          break
        case 1:
          console.log("Go Main")
          if (this.data.title != 'order_intake') {
            this.router.navigate(['/'], { replaceUrl: true })
          } else {
            return false
          }
      }
      return false
    }
    return true
  }
}