import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPage } from './logout';
import { AuthService } from '../services/auth';

describe('LogoutComponent', () => {
  let component: LogoutPage;
  let fixture: ComponentFixture<LogoutPage>;
  let authService: AuthService;
  let authServiceStub: {
    loggedIn: boolean,
    logout: any
  };

  beforeEach(async(() => {
    authServiceStub = {
      loggedIn: true,
      logout: (function() {
        this.loggedIn = false;
      })
    };
    TestBed.configureTestingModule({
      declarations: [ LogoutPage ],
      providers: [ { provide: AuthService, useValue: authServiceStub } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPage);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout the user', () => {
    authService.loggedIn = true;
    expect(authService.loggedIn).toBeTruthy();
    authService.logout();
    expect(authService.loggedIn).toBeFalsy();
  });
});
