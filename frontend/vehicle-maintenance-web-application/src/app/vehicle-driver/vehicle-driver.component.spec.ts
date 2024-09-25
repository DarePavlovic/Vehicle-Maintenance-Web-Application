import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDriverComponent } from './vehicle-driver.component';

describe('VehicleDriverComponent', () => {
  let component: VehicleDriverComponent;
  let fixture: ComponentFixture<VehicleDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
