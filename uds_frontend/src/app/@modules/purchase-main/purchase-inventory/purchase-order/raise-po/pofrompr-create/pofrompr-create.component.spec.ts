import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PofromprCreateComponent } from './pofrompr-create.component';

describe('PofromprCreateComponent', () => {
  let component: PofromprCreateComponent;
  let fixture: ComponentFixture<PofromprCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PofromprCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PofromprCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
