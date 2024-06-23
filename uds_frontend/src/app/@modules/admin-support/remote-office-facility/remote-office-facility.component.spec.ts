import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteOfficeFacilityComponent } from './remote-office-facility.component';

describe('RemoteOfficeFacilityComponent', () => {
  let component: RemoteOfficeFacilityComponent;
  let fixture: ComponentFixture<RemoteOfficeFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteOfficeFacilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteOfficeFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
