import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-z-confirm-panel',
  templateUrl: './z-confirm-panel.component.html',
  styleUrls: ['./z-confirm-panel.component.scss']
})
export class ZConfirmPanelComponent implements OnInit {
  @Input() data: any;
  @Output() onResult = new EventEmitter<boolean>();
  private _clicked: boolean;
  constructor() { }

  ngOnInit() {
    this._clicked = false;
  }
  result(r: boolean){
    this.onResult.emit(r);
    this._clicked = true;
  }
}
