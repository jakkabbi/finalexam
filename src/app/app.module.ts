import { NgModule, ErrorHandler } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app';


import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { AdminPage } from '../pages/admin/admin';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { SharesPage } from '../pages/shares/shares';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ShareService } from './services/share';
import { UserService } from './services/user';
import { AuthService } from './services/auth';
import { AuthGuardLogin } from './services/auth-guard-login';
import { AuthGuardAdmin } from './services/auth-guard-admin';

import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    AdminPage,
    ContactPage,
    HomePage,
    LoginPage,
    LogoutPage,
    RegisterPage,
    SharesPage,
    TabsPage

  ],
  imports: [
    BrowserModule,
    SharedModule,
    IonicModule.forRoot(MyApp),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedShares: ['localhost:3000', 'localhost:4200']
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AccountPage,
    AdminPage,
    ContactPage,
    HomePage,
    LoginPage,
    LogoutPage,
    RegisterPage,
    SharesPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShareService,
    UserService,
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
