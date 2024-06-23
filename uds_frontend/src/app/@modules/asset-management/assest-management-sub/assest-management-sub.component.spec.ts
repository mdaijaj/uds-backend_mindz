import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestManagementSubComponent } from './assest-management-sub.component';

describe('AssestManagementSubComponent', () => {
  let component: AssestManagementSubComponent;
  let fixture: ComponentFixture<AssestManagementSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssestManagementSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssestManagementSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
