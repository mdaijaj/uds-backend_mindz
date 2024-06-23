import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductActionComponent } from './add-product-action.component';

describe('AddProductActionComponent', () => {
  let component: AddProductActionComponent;
  let fixture: ComponentFixture<AddProductActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
