import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOnHoldComponent } from './on-hold.component';

describe('UserOnHoldComponent', () => {
  let component: UserOnHoldComponent;
  let fixture: ComponentFixture<UserOnHoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOnHoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOnHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
