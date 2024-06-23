import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainActionComponent } from './complain-action.component';

describe('ComplainActionComponent', () => {
  let component: ComplainActionComponent;
  let fixture: ComponentFixture<ComplainActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
