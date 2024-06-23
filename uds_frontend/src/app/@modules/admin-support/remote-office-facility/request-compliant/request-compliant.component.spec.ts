import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCompliantComponent } from './request-compliant.component';

describe('RequestCompliantComponent', () => {
  let component: RequestCompliantComponent;
  let fixture: ComponentFixture<RequestCompliantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCompliantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCompliantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
