import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRequestActionComponent } from './email-request-action.component';

describe('EmailRequestActionComponent', () => {
  let component: EmailRequestActionComponent;
  let fixture: ComponentFixture<EmailRequestActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailRequestActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailRequestActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
