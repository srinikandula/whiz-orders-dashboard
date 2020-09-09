import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashmanagementComponent } from './cashmanagement.component';

describe('CashmanagementComponent', () => {
  let component: CashmanagementComponent;
  let fixture: ComponentFixture<CashmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
