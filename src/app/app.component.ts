import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabsPage;
  rootPage:any = null;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authProvider: AuthProvider
   ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    authProvider.authUser
              .subscribe(jwt => {
                   if(jwt) this.rootPage = TabsPage;
                   if(!jwt) this.rootPage = LoginPage;
              });

    authProvider.checkAuthentication();

  }
}
