import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDilogComponent } from './email-dilog.component';

describe('EmailDilogComponent', () => {
  let component: EmailDilogComponent;
  let fixture: ComponentFixture<EmailDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
