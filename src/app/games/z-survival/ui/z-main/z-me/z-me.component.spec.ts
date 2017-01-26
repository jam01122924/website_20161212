/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZMeComponent } from './z-me.component';

describe('ZMeComponent', () => {
  let component: ZMeComponent;
  let fixture: ComponentFixture<ZMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
