import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetVehicleComponent } from './set-vehicle.component';

describe('SetVehicleComponent', () => {
  let component: SetVehicleComponent;
  let fixture: ComponentFixture<SetVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
