import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleProfileComponent } from './vehicle-profile.component';

describe('VehicleProfileComponent', () => {
  let component: VehicleProfileComponent;
  let fixture: ComponentFixture<VehicleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
