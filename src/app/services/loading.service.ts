import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class LoadingService { loading$ = new BehaviorSubject<boolean>(false) }
