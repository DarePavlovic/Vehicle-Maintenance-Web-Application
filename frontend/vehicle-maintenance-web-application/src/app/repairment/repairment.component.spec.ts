import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairmentComponent } from './repairment.component';

describe('RepairmentComponent', () => {
  let component: RepairmentComponent;
  let fixture: ComponentFixture<RepairmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
