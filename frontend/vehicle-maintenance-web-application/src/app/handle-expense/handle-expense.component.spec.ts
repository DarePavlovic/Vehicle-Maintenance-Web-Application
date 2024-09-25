import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleExpenseComponent } from './handle-expense.component';

describe('HandleExpenseComponent', () => {
  let component: HandleExpenseComponent;
  let fixture: ComponentFixture<HandleExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
