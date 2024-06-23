import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexRequestLaterComponent } from './forex-request-later.component';

describe('ForexRequestLaterComponent', () => {
  let component: ForexRequestLaterComponent;
  let fixture: ComponentFixture<ForexRequestLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexRequestLaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexRequestLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
