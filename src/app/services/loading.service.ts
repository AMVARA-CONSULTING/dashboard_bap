import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
    // Shows loading spinner
    loading$ = new BehaviorSubject<boolean>(false);
}
