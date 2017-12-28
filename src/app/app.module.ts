import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CantineMainPage } from '../pages/cantine-main/cantine-main';
import { CantinesServiceProvider } from '../providers/cantines-service/cantines-service';
import { MapPage } from '../pages/map/map'
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    CantineMainPage, 
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule, 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CantineMainPage, 
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CantinesServiceProvider, 
  ]
})
export class AppModule {}
