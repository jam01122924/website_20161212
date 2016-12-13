import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {
  private _constValue:any = {};
  private _url:any = {};

  constructor() {
    this._url = {
      root: 'http://127.0.0.1:8998/api/',
      login: 'api-token-auth/',
      register: 'user-info/users/',
      users: 'user-info/users/',
      character: 'character/'
    };
  }

  get constValue():any {
    return this._constValue;
  }

  get url():any {
    return this._url;
  }
}
