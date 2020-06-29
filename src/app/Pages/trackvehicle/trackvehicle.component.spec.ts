import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackvehicleComponent } from './trackvehicle.component';

describe('TrackvehicleComponent', () => {
  let component: TrackvehicleComponent;
  let fixture: ComponentFixture<TrackvehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackvehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
