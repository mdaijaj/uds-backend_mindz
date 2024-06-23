import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexCurrencyComponent } from './forex-currency.component';

describe('ForexCurrencyComponent', () => {
  let component: ForexCurrencyComponent;
  let fixture: ComponentFixture<ForexCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
