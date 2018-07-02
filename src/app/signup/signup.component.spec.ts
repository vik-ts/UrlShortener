import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let de_submit: DebugElement;
  let de_name: DebugElement;
  let de_login: DebugElement;
  let de_password: DebugElement;

  let el_submit: HTMLButtonElement;
  let el_name: HTMLInputElement;
  let el_login: HTMLInputElement;
  let el_password: HTMLInputElement;

  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [RouterTestingModule, HttpClientModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    de_submit = fixture.debugElement.query(By.css('button[type=submit]'));
    if (de_submit) { el_submit = de_submit.nativeElement; }

    de_name = fixture.debugElement.query(By.css('input[type=name]'));
    if (de_name) { el_name = de_name.nativeElement; }

    de_login = fixture.debugElement.query(By.css('input[type=login]'));
    if (de_login) { el_login = de_login.nativeElement; }

    de_password = fixture.debugElement.query(By.css('input[type=password]'));
    if (de_password) { el_password = de_password.nativeElement; }

    spy = spyOn(component, 'saveUser').and.callFake(function () {
      this.message = 'TEST: ПОЛЬЗОВАТЕЛЬ СОЗДАН';
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on the form must be fields Name, Login, Password and OK button', () => {
    expect(de_submit).toBeTruthy();
    expect(de_name).toBeTruthy();
    expect(de_login).toBeTruthy();
    expect(de_password).toBeTruthy();
  });

  it('the OK button must be inactive when the form is first opened', () => {
    fixture.whenStable().then(() => {
      expect(el_submit.disabled).toBeTruthy();
    });
  });

  it('the OK button must be active when Name, Login and Password are filled', () => {
    fixture.whenStable().then(() => {
      el_name.value = 'test';
      el_name.dispatchEvent(new Event('input'));

      expect(el_submit.disabled).toBeTruthy();

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
      el_name.value = 'test';
      el_name.dispatchEvent(new Event('input'));

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
      el_name.value = 'test';
      el_name.dispatchEvent(new Event('input'));

      el_login.value = 'test';
      el_login.dispatchEvent(new Event('input'));

      el_password.value = 'test';
      el_password.dispatchEvent(new Event('input'));

      el_submit.click();

      fixture.whenStable().then(() => {
        expect(component.message).toEqual('TEST: ПОЛЬЗОВАТЕЛЬ СОЗДАН');
      });
    });
  });
});
