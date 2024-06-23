import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnForexCurrencyComponent } from './return-forex-currency.component';

describe('ReturnForexCurrencyComponent', () => {
  let component: ReturnForexCurrencyComponent;
  let fixture: ComponentFixture<ReturnForexCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnForexCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnForexCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
