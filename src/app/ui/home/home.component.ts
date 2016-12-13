import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

import { LoginComponent } from '../../common/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataResult = [];
  constructor(private authS: AuthService) { }

  ngOnInit() {
  }

  public getUserData() {
    this.authS.getUserData().subscribe(data => {
      if(data) {
        this.dataResult = data;
      }
    }, error => {
        console.log(error);
    });
  }
}
