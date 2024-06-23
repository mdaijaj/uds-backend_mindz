import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnLaterComponent } from './return-later.component';

describe('ReturnLaterComponent', () => {
  let component: ReturnLaterComponent;
  let fixture: ComponentFixture<ReturnLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnLaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
