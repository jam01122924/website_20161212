import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from "@angular/router";


import { HttpService } from './http.service';
import { ValueService } from './value.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  public loggedIn: boolean = false;
  public returnUrl: string = '';
  public isAdmin: boolean = false;
  public currentUser: any = null;
  public refreshTokenProcess: any;

  constructor(private httpS: HttpService, private valueS: ValueService, private tokenS: TokenService, private router: Router, private cookieS: CookieService) {
  }

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

  logout() {
    this.tokenS.token = '';
    this.loggedIn = false;
    this.cookieS.remove('token');
  }

  startRefreshToken(token) {
    this.refreshTokenProcess = setInterval(() => {
      this.verifyToken(token).subscribe(data => {
        this.tokenS.token = data.token;
        this.loggedIn = true;
        this.cookieS.put('token', this.tokenS.token);
      }, error => {
        this.logout();
        console.error(error);
      });
    }, 149000);
  }

  stopRefreshToken() {
    clearInterval(this.refreshTokenProcess);
  }

  register(params) {
    return this.httpS.post(this.valueS.url.register, params);
  }

  getUserData() {
    return this.httpS.get(this.valueS.url.users);

    // let headers = new Headers;
    // headers.append('Authorization', 'JWT ' + this.user_token);
    // return this.httpS.get('http://127.0.0.1:8998/character/', { headers: headers })
    //   .map((res:Response) => res.json());
  }

  getUserDetailData(id?: string) {
    let userId = id ? id : this.currentUser ? this.currentUser.id : '';
    console.log(userId);
    return this.httpS.get(this.valueS.url.users + userId + '/');
  }

  verifyToken(token) {
    var params = {
      'token': token
    };
    return this.httpS.post(this.valueS.url.refreshToken, params);
  }

  checkUserLogin(url):any {
    var token = this.tokenS.token?this.tokenS.token:this.cookieS.get('token')?this.cookieS.get('token'):'';
    return new Promise((resolve, reject) => {
      this.verifyToken(token).subscribe(data => {
        // console.log("checkUserLogin pass", data.token);
        this.tokenS.token = data.token;
        this.loggedIn = true;
        this.cookieS.put('token', this.tokenS.token);
        resolve(data);
      }, error => {
        console.log("checkUserLogin fail");
        this.logout();
        this.returnUrl = url;
        this.router.navigate(['login',]);
        reject(error);
      });
    });
  }
}
