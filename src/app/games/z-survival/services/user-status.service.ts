import { Injectable } from '@angular/core';

@Injectable()
export class UserStatusService {
  public isFirstTime: boolean;
  constructor() {
    // fake data;
    this.isFirstTime = false;
  }

}
