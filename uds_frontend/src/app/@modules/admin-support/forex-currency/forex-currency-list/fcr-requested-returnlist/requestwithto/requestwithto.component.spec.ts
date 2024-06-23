import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestwithtoComponent } from './requestwithto.component';

describe('RequestwithtoComponent', () => {
  let component: RequestwithtoComponent;
  let fixture: ComponentFixture<RequestwithtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestwithtoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestwithtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
