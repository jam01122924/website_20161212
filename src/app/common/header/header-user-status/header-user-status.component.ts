import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header-user-status',
  templateUrl: './header-user-status.component.html',
  styleUrls: ['./header-user-status.component.scss']
})
export class HeaderUserStatusComponent implements OnInit {

  constructor(private authS: AuthService) { }

  ngOnInit() {
  }

}
