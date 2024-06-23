import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRemoteOfficeComponent } from './create-remote-office.component';

describe('CreateRemoteOfficeComponent', () => {
  let component: CreateRemoteOfficeComponent;
  let fixture: ComponentFixture<CreateRemoteOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRemoteOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRemoteOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
