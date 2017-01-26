import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userName: string;
  public password: string;
  public loginError;
  public currentState: string;
  public returnUrl: string;

  constructor(private authS: AuthService, private tokenS: TokenService, private router: Router) { }

  ngOnInit() {
    this.currentState = 'login';
  }

  public login() {
    this.authS.login(this.userName, this.password).subscribe(data => {
      if(data.token) {
        // console.log(this.tokenS.token);
        this.tokenS.token = data.token;
        this.authS.getUserData().subscribe(data => {
          this.loginError = '';
          this.authS.loggedIn = true;
          this.authS.currentUser = data[0];
          this.authS.startRefreshToken(this.tokenS.token);
          this.router.navigate([this.authS.returnUrl]);
        }, error => {
          this.tokenS.token = '';
          console.log(this.tokenS.token);
          console.log(error);
          console.log(error._body);
          this.loginError = 'Can not find User object';
        });
      }
    }, error => {
      this.tokenS.token = '';
      console.log(this.tokenS.token);
      console.log(error);
      console.log(error._body);
      this.loginError = JSON.parse(error._body).non_field_errors[0] === "Unable to login with provided credentials."?'Wrong user name or password':'';
    });
  }

  public logout() {
    this.authS.logout();
  }

  public registerSuccess(regSuccess) {
    if(regSuccess) {
      this.currentState='login';
    }
  }
}
