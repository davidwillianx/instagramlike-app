import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewMediaPage } from './new-media';

@NgModule({
  declarations: [
    NewMediaPage,
  ],
  imports: [
    IonicPageModule.forChild(NewMediaPage),
  ],
})
export class NewMediaPageModule {}
