import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';


import { HttpService } from './http.service';
import { ValueService } from './value.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  public loggedIn: boolean = false;
  public returnUrl: string = '';
  public isAdmin: boolean = false;
  public currentUser: any = null;
  constructor(private httpS: HttpService, private valueS: ValueService, private tokenS: TokenService) { }

  login(userName, password) {
    let body = {
      username: userName,
      password: password
    };
    // let body = new URLSearchParams();
    // body.set('username', userName?userName:'');
    // body.set('password', password?password:'');
    // let headers = new Headers;
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //
    // return this.http.post('http://127.0.0.1:8998/api-token-auth/', body, { headers: headers, withCredentials: true })
    //   .map((res:Response) => res.json());
    //
    return this.httpS.post(this.valueS.url.login, body);
      // .subscribe(data => {
      //   console.log(data);
      //   if(data.status === 200 && data._body) {
      //     this.user_token = JSON.parse(data._body).token;
      //     console.log(this.user_token);
      //   }
      //   return  this.user_token;
      // }, error => {
      //     console.log(JSON.stringify(error.json()));
      // });
  }

  register(params) {
    console.log(params);
    return this.httpS.post(this.valueS.url.register, params);
  }

  getUserData() {
    let param = {
      token: this.tokenS.token
    };

    return this.httpS.get(this.valueS.url.users, param);

    // let headers = new Headers;
    // headers.append('Authorization', 'JWT ' + this.user_token);
    // return this.httpS.get('http://127.0.0.1:8998/character/', { headers: headers })
    //   .map((res:Response) => res.json());
  }

  getUserDetailData(id?:string) {
    let param = {
      token: this.tokenS.token
    };
    console.log(this.valueS.url.users);
    let userId = id?id:this.currentUser?this.currentUser.id:'';
    console.log(userId);
    return this.httpS.get(this.valueS.url.users + userId + '/', param);
  }
}
