import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAssetUpdateComponent } from './product-asset-update.component';

describe('ProductAssetUpdateComponent', () => {
  let component: ProductAssetUpdateComponent;
  let fixture: ComponentFixture<ProductAssetUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAssetUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAssetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
