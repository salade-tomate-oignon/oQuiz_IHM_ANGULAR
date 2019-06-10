import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRightSidebarComponent } from './header-right-sidebar.component';

describe('HeaderRightSidebarComponent', () => {
  let component: HeaderRightSidebarComponent;
  let fixture: ComponentFixture<HeaderRightSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderRightSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
