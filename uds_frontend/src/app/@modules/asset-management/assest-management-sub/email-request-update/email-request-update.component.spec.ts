import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRequestUpdateComponent } from './email-request-update.component';

describe('EmailRequestUpdateComponent', () => {
  let component: EmailRequestUpdateComponent;
  let fixture: ComponentFixture<EmailRequestUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailRequestUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailRequestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
