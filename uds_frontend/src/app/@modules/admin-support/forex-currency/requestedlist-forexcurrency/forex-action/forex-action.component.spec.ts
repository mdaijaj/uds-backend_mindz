import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexActionComponent } from './forex-action.component';

describe('ForexActionComponent', () => {
  let component: ForexActionComponent;
  let fixture: ComponentFixture<ForexActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
