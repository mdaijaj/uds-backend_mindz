import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainDailogComponent } from './complain-dailog.component';

describe('ComplainDailogComponent', () => {
  let component: ComplainDailogComponent;
  let fixture: ComponentFixture<ComplainDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
