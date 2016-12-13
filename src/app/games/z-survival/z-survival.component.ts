import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-z-survival',
  templateUrl: 'z-survival.component.html',
  styleUrls: ['z-survival.component.scss']
})
export class ZSurvivalComponent implements OnInit {
  public isFirstTime: boolean = false;
  constructor(private authS: AuthService, private router: Router) { }

  ngOnInit() {
    // if(!this.authS.loggedIn){
    //   this.authS.returnUrl = 'z-survival';
    //   this.router.navigate(['login', ]);
    // } else if(this.isFirstTime) {
    //   this.router.navigate(['z-survival/intro']);
    // } else {
    //   this.router.navigate(['z-survival/main']);
    // }

    this.router.navigate(['z-survival/main']);
  }

}
