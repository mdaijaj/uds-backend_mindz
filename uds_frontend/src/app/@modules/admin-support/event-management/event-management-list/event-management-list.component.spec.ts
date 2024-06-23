import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagementListComponent } from './event-management-list.component';

describe('EventManagementListComponent', () => {
  let component: EventManagementListComponent;
  let fixture: ComponentFixture<EventManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventManagementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
