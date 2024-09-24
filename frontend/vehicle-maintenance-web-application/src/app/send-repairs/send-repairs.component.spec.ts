import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRepairsComponent } from './send-repairs.component';

describe('SendRepairsComponent', () => {
  let component: SendRepairsComponent;
  let fixture: ComponentFixture<SendRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRepairsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
