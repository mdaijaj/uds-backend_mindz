import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexCurrencyAdminComponent } from './forex-currency-admin.component';

describe('ForexCurrencyAdminComponent', () => {
  let component: ForexCurrencyAdminComponent;
  let fixture: ComponentFixture<ForexCurrencyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexCurrencyAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexCurrencyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
