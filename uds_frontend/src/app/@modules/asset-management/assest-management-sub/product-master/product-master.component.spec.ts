import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetegoryMasterComponent } from './product-master.component';

describe('CetegoryMasterComponent', () => {
  let component: CetegoryMasterComponent;
  let fixture: ComponentFixture<CetegoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CetegoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CetegoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
