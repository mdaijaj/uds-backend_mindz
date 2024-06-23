import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexAdminActionComponent } from './forex-admin-action.component';

describe('ForexAdminActionComponent', () => {
  let component: ForexAdminActionComponent;
  let fixture: ComponentFixture<ForexAdminActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexAdminActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexAdminActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
