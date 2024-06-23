import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexCurrencyListComponent } from './forex-currency-list.component';

describe('ForexCurrencyListComponent', () => {
  let component: ForexCurrencyListComponent;
  let fixture: ComponentFixture<ForexCurrencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexCurrencyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexCurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
