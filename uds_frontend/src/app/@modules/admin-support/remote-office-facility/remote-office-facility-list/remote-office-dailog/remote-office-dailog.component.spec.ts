import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteOfficeDailogComponent } from './remote-office-dailog.component';

describe('RemoteOfficeDailogComponent', () => {
  let component: RemoteOfficeDailogComponent;
  let fixture: ComponentFixture<RemoteOfficeDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteOfficeDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteOfficeDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
