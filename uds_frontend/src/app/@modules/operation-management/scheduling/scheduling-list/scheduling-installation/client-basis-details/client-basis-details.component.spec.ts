import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBasisDetailsComponent } from './client-basis-details.component';

describe('ClientBasisDetailsComponent', () => {
  let component: ClientBasisDetailsComponent;
  let fixture: ComponentFixture<ClientBasisDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBasisDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBasisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
