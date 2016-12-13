/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZMainComponent } from './z-main.component';

describe('ZMainComponent', () => {
  let component: ZMainComponent;
  let fixture: ComponentFixture<ZMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
