import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDailogComponent } from './event-dailog.component';

describe('EventDailogComponent', () => {
  let component: EventDailogComponent;
  let fixture: ComponentFixture<EventDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
