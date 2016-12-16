import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { TokenService } from './token.service';

@Injectable()
export class HttpService {
  private _url = 'http://127.0.0.1:8998/api/';
  constructor(private http: Http, private tokenS: TokenService) {

  }

  get(url: string, param?: any): Observable<any> {
    let options = this.setHeader(param);
    return this.http.get(this._url + url, options)
      .map((res: Response) => res.json())
      .catch((error: any) => this.handleError(error))
  }

  post(url: string, body: any, param?: any): Observable<any> {
    let bodyString = JSON.stringify(body);
    let options = this.setHeader(param);
    return this.http.post(this._url + url, bodyString, options)
      .map((res:Response) => res.json())
      .catch((error: any) => this.handleError(error))
  }
  put(url: string, body: any): Observable<any> {
    let bodyString = JSON.stringify(body);
    let options = this.setHeader();
    return this.http.put(this._url + url, bodyString, options)
      .map((res:Response) => res.json())
      .catch((error: any) => this.handleError(error))
  }
  remove(url: string): Observable<any> {
    return this.http.delete(this._url + url)
      .map((res:Response) => res.json())
      .catch((error: any) => this.handleError(error))
  }
  patch(url: string, body: any): Observable<any> {
    let bodyString = JSON.stringify(body);
    let options = this.setHeader();
    return this.http.patch(this._url + url, bodyString, options)
      .map((res:Response) => res.json())
      .catch((error: any) => this.handleError(error))
  }

  setHeader(param?: any): RequestOptions {
    let headers = new Headers({ 'Content-Type': param && param.contentType ? param.contentType : 'application/json' });
    param = param?param:{
      token: this.tokenS.token
    };
    if(param && param.token){
      headers.append('Authorization', 'JWT ' + param.token);
    }
    return new RequestOptions({ headers: headers });
  }

  handleError(error) {
    console.log(error);
    return Observable.throw(error || 'Server error')
  }
}
