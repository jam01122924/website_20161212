import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private _token: string = '';
  constructor() { }

  cleanToken() {
    this._token = '';
  }

  get token(): string {
    return this._token;
  }
  set token(t) {
    this._token = t?t:this._token;
  }

}
