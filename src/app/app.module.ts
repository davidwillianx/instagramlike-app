import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { CustomFormsModule } from 'ng2-validation';

// TOKEN CONFIG
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage, IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { NewMediaPage } from '../pages/new-media/new-media';
import { SearchPage } from '../pages/search/search';
import { FollowContentPage } from '../pages/follow-content/follow-content';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//PROVIDERS
import { AuthProvider } from '../providers/auth/auth';


export function jwtOptionsFactory(storage: Storage){

  return {
    tokenGetter: () => storage.get('jwt_token'),
    whitelistedDomains: ['localhost:8080/instagramlike']
  };

}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    AboutPage,
    TabsPage,
    NewMediaPage,
    SearchPage,
    FollowContentPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    JwtModule.forRoot({
      jwtOptionsProvider: {
         provide: JWT_OPTIONS,
         useFactory: jwtOptionsFactory,
         deps: [Storage]
      }
    }),

    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CustomFormsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    AboutPage,
    TabsPage,
    NewMediaPage,
    SearchPage,
    FollowContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
