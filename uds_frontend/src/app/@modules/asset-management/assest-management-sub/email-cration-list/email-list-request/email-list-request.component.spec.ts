import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListRequestComponent } from './email-list-request.component';

describe('EmailListRequestComponent', () => {
  let component: EmailListRequestComponent;
  let fixture: ComponentFixture<EmailListRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailListRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
