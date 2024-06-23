import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedlistForexcurrencyComponent } from './requestedlist-forexcurrency.component';

describe('RequestedlistForexcurrencyComponent', () => {
  let component: RequestedlistForexcurrencyComponent;
  let fixture: ComponentFixture<RequestedlistForexcurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedlistForexcurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedlistForexcurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
