import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteOfficeComplainListComponent } from './remote-office-complain-list.component';

describe('RemoteOfficeComplainListComponent', () => {
  let component: RemoteOfficeComplainListComponent;
  let fixture: ComponentFixture<RemoteOfficeComplainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteOfficeComplainListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteOfficeComplainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
