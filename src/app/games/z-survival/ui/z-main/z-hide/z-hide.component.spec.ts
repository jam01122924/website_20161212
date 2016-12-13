/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZHideComponent } from './z-hide.component';

describe('ZHideComponent', () => {
  let component: ZHideComponent;
  let fixture: ComponentFixture<ZHideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZHideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
