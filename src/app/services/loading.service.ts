import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {

  constructor() {
    this.loading$ = new BehaviorSubject<boolean>(false)
  }

  loading$: BehaviorSubject<boolean>
}
