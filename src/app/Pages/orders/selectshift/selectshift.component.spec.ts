import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectshiftComponent } from './selectshift.component';

describe('SelectshiftComponent', () => {
  let component: SelectshiftComponent;
  let fixture: ComponentFixture<SelectshiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectshiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
