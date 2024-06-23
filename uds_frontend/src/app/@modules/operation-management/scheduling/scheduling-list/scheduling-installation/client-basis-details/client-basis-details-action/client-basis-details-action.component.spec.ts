import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBasisDetailsActionComponent } from './client-basis-details-action.component';

describe('ClientBasisDetailsActionComponent', () => {
  let component: ClientBasisDetailsActionComponent;
  let fixture: ComponentFixture<ClientBasisDetailsActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBasisDetailsActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBasisDetailsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
