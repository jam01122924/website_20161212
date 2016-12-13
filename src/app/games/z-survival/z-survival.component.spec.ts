/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZSurvivalComponent } from './z-survival.component';

describe('ZSurvivalComponent', () => {
  let component: ZSurvivalComponent;
  let fixture: ComponentFixture<ZSurvivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZSurvivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZSurvivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
