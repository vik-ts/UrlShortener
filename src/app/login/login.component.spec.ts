import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let de_submit: DebugElement;
  let de_login: DebugElement;
  let de_password: DebugElement;

  let el_submit: HTMLButtonElement;
  let el_login: HTMLInputElement;
  let el_password: HTMLInputElement;

  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [AuthService, { provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [RouterTestingModule, HttpClientModule, FormsModule, BrowserModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    de_submit = fixture.debugElement.query(By.css('button[type=submit]'));
    if (de_submit) { el_submit = de_submit.nativeElement; }

    de_login = fixture.debugElement.query(By.css('input[type=login]'));
    if (de_login) { el_login = de_login.nativeElement; }

    de_password = fixture.debugElement.query(By.css('input[type=password]'));
    if (de_password) { el_password = de_password.nativeElement; }

    const authService = fixture.debugElement.injector.get(AuthService);
    spy = spyOn(authService, 'doLogin')
      .and.returnValue(Observable.fromPromise(Promise.resolve({ success: true, message: 'TEST: ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНИЛСЯ' })));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on the form must be fields Login, Password and OK button', () => {
    expect(de_submit).toBeTruthy();
    expect(de_login).toBeTruthy();
    expect(de_password).toBeTruthy();
  });

  it('the OK button must be inactive when the form is first opened', () => {
    fixture.whenStable().then(() => {
      expect(el_submit.disabled).toBeTruthy();
    });
  });

  it('the OK button must be active when Login and Password are filled', () => {
    fixture.whenStable().then(() => {
      el_login.value = 'test';
      el_login.dispatchEvent(new Event('input'));

      expect(el_submit.disabled).toBeTruthy();

      el_password.value = 'test';
      el_password.dispatchEvent(new Event('input'));

      expect(el_submit.disabled).toBeFalsy();
    });
  });

  it('the handler for the OK button should work correctly', () => {
    fixture.whenStable().then(() => {
      el_login.value = 'test';
      el_login.dispatchEvent(new Event('input'));

      el_password.value = 'test';
      el_password.dispatchEvent(new Event('input'));

      expect(spy.calls.any()).toBe(false, 'не было вызова по кнопке OK');
      el_submit.click();
      expect(spy.calls.any()).toBe(true, 'был вызов по кнопке OK');
    });
  });

  it('is the input result displayed correctly?', () => {
    fixture.whenStable().then(() => {
      el_login.value = 'test';
      el_login.dispatchEvent(new Event('input'));

      el_password.value = 'test';
      el_password.dispatchEvent(new Event('input'));

      el_submit.click();

      fixture.whenStable().then(() => {
        expect(component.message).toEqual('TEST: ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНИЛСЯ');
      });
    });
  });
});
