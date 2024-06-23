import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkFlowComponent } from './add-work-flow.component';

describe('AddWorkFlowComponent', () => {
  let component: AddWorkFlowComponent;
  let fixture: ComponentFixture<AddWorkFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
