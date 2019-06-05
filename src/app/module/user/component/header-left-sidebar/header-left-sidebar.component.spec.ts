import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLeftSidebarComponent } from './header-left-sidebar.component';

describe('HeaderLeftSidebarComponent', () => {
  let component: HeaderLeftSidebarComponent;
  let fixture: ComponentFixture<HeaderLeftSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLeftSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
