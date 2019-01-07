import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userInfo: object;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo = this.navParams.get("data");
  }

}
