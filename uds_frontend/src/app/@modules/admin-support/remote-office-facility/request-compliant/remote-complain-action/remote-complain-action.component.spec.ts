import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteComplainActionComponent } from './remote-complain-action.component';

describe('RemoteComplainActionComponent', () => {
  let component: RemoteComplainActionComponent;
  let fixture: ComponentFixture<RemoteComplainActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteComplainActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteComplainActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
