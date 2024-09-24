import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepairsComponent } from './add-repairs.component';

describe('AddRepairsComponent', () => {
  let component: AddRepairsComponent;
  let fixture: ComponentFixture<AddRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRepairsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
