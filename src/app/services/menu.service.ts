import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
	expend: boolean = true;

  constructor() {}
  trigger() {
		this.expend = !this.expend;
  }
}
