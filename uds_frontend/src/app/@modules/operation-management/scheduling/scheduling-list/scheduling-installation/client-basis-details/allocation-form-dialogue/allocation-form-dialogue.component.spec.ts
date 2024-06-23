import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationFormDialogueComponent } from './allocation-form-dialogue.component';

describe('AllocationFormDialogueComponent', () => {
  let component: AllocationFormDialogueComponent;
  let fixture: ComponentFixture<AllocationFormDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationFormDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationFormDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
