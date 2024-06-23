import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTaskComponent } from './action.component';

describe('ActionTaskComponent', () => {
  let component: ActionTaskComponent;
  let fixture: ComponentFixture<ActionTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
