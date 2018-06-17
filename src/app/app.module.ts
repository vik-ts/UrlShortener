import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InfoComponent } from './info/info.component';
import { LinkcreateComponent } from './linkcreate/linkcreate.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { InfoOneComponent } from './info-one/info-one.component';
import { TagComponent } from './tag/tag.component';
import { LinkeditComponent } from './linkedit/linkedit.component';
import { AuthService } from './auth.service';
import { OpenlinkComponent } from './openlink/openlink.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Сервис' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Вход' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Регистрация' }
  },
  {
    path: 'info',
    component: InfoComponent,
    data: { title: 'Информация' }
  },
  {
    path: 'info-user',
    component: InfoUserComponent,
    data: { title: 'Статистика' }
  },
  {
    path: 'info-one/:shortlink',
    component: InfoOneComponent,
    data: { title: 'ИнформацияПодробно' }
  },
  {
    path: 'tag/:tagone',
    component: TagComponent,
    data: { title: 'СсылкиСТегом' }
  },
  {
    path: 'linkcreate',
    component: LinkcreateComponent,
    data: { title: 'Сокращатель' }
  },
  {
    path: 'linkedit/:shortlink',
    component: LinkeditComponent,
    data: { title: 'Редактирование' }
  },
  {
    path: 'openlink/:shortlink',
    component: OpenlinkComponent,
    data: { title: 'Редактирование' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InfoComponent,
    InfoUserComponent,
    TagComponent,
    OpenlinkComponent,
    LinkeditComponent,
    InfoOneComponent,
    LinkcreateComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
