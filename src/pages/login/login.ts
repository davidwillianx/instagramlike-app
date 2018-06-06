import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

import {finalize} from 'rxjs/operators';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider
  ) {}

  ionViewDidLoad() {
    this.username = "teste";
    this.password = "teste1"
  }

  login(username: string, password: string){
    this.authProvider.login({
        username: username,
         password: password
    })
    .pipe(finalize( () =>  {} ))
    .subscribe(
      () => {},
      (err) => console.log('This should show an error message on the top of the screen')
    );



  }

}
