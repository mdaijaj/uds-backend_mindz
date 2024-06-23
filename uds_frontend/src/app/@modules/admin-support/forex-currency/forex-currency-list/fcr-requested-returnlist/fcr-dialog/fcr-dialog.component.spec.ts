import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcrDialogComponent } from './fcr-dialog.component';

describe('FcrDialogComponent', () => {
  let component: FcrDialogComponent;
  let fixture: ComponentFixture<FcrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcrDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
