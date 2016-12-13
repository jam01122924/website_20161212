import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  loggedIn: boolean;
  constructor(private tokenS: TokenService, private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.tokenS.token && this.tokenS.token !== '';
  }

  startZSurvival() {
    this.router.navigate(['/z-survival']);
  }

}
