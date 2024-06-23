import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexAdminFormComponent } from './forex-admin-form.component';

describe('ForexAdminFormComponent', () => {
  let component: ForexAdminFormComponent;
  let fixture: ComponentFixture<ForexAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexAdminFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
