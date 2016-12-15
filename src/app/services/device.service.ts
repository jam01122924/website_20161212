import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DeviceService {
  width$: Observable<any>;
  height$: Observable<any>;

  constructor() {
    let windowSize$ = new BehaviorSubject(getWindowSize());
    this.width$ = windowSize$.pluck('width').distinctUntilChanged();
    this.height$ = windowSize$.pluck('height').distinctUntilChanged();
    Observable.fromEvent(window, 'resize')
      .map(getWindowSize)
      .subscribe(windowSize$);
  }

}

function getWindowSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  };
}
