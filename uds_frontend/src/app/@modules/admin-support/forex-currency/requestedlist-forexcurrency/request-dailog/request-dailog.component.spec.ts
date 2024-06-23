import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDailogComponent } from './request-dailog.component';

describe('RequestDailogComponent', () => {
  let component: RequestDailogComponent;
  let fixture: ComponentFixture<RequestDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
