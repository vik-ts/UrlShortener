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
    path: 'linkcreate',
    component: LinkcreateComponent,
    data: { title: 'Сокращатель' }
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
