import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForAdminEventManagementListComponent } from './for-admin-event-management-list.component';

describe('ForAdminEventManagementListComponent', () => {
  let component: ForAdminEventManagementListComponent;
  let fixture: ComponentFixture<ForAdminEventManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForAdminEventManagementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForAdminEventManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
