import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcrRequestedReturnlistComponent } from './fcr-requested-returnlist.component';

describe('FcrRequestedReturnlistComponent', () => {
  let component: FcrRequestedReturnlistComponent;
  let fixture: ComponentFixture<FcrRequestedReturnlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcrRequestedReturnlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcrRequestedReturnlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
