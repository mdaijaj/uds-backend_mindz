import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexAdminDailogComponent } from './forex-admin-dailog.component';

describe('ForexAdminDailogComponent', () => {
  let component: ForexAdminDailogComponent;
  let fixture: ComponentFixture<ForexAdminDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexAdminDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexAdminDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
