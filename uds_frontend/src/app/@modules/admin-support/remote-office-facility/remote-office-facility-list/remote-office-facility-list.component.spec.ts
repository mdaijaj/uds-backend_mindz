import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteOfficeFacilityListComponent } from './remote-office-facility-list.component';

describe('RemoteOfficeFacilityListComponent', () => {
  let component: RemoteOfficeFacilityListComponent;
  let fixture: ComponentFixture<RemoteOfficeFacilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteOfficeFacilityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteOfficeFacilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
