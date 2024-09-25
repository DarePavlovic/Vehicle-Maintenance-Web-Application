import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsMechanicComponent } from './earnings-mechanic.component';

describe('EarningsMechanicComponent', () => {
  let component: EarningsMechanicComponent;
  let fixture: ComponentFixture<EarningsMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningsMechanicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningsMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
