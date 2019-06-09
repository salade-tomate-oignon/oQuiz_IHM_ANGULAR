import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFriendComponent } from './header-friend.component';

describe('HeaderFriendComponent', () => {
  let component: HeaderFriendComponent;
  let fixture: ComponentFixture<HeaderFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
