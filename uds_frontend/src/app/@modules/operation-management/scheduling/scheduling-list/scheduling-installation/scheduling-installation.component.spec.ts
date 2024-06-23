import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingInstallationComponent } from './scheduling-installation.component';

describe('SchedulingInstallationComponent', () => {
  let component: SchedulingInstallationComponent;
  let fixture: ComponentFixture<SchedulingInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingInstallationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
