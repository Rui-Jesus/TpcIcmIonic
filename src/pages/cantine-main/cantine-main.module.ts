import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CantineMainPage } from './cantine-main';

@NgModule({
  declarations: [
    CantineMainPage,
  ],
  imports: [
    IonicPageModule.forChild(CantineMainPage),
  ],
})
export class CantineMainPageModule {}
