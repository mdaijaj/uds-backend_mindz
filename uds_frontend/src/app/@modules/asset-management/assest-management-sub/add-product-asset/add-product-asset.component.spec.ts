import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductAssetComponent } from './add-product-asset.component';

describe('AddProductAssetComponent', () => {
  let component: AddProductAssetComponent;
  let fixture: ComponentFixture<AddProductAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
