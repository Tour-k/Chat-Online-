import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithAccountComponent } from './login-with-account.component';

describe('LoginWithAccountComponent', () => {
  let component: LoginWithAccountComponent;
  let fixture: ComponentFixture<LoginWithAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
