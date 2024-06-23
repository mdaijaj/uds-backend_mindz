import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexCurrencyRateComponent } from './forex-currency-rate.component';

describe('ForexCurrencyRateComponent', () => {
  let component: ForexCurrencyRateComponent;
  let fixture: ComponentFixture<ForexCurrencyRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexCurrencyRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexCurrencyRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
