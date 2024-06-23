import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteOfficeActionComponent } from './remote-office-action.component';

describe('RemoteOfficeActionComponent', () => {
  let component: RemoteOfficeActionComponent;
  let fixture: ComponentFixture<RemoteOfficeActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteOfficeActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteOfficeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
