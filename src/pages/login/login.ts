import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  _configOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }; 
  username = "";
  password = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public _httpClient: HttpClient, public _loadingController: LoadingController, public _alertController: AlertController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  btnLoginClick() {
    let apiUrl = "";
    apiUrl = "http://localhost/KdcTest/api/account/loginbyusername";
    let objUser = {
      USERNAME: this.username,
      PASSWORD: this.password
    };
    let loading = this._loadingController.create();
    loading.present();
    this._httpClient.post(apiUrl, JSON.stringify(objUser), this._configOptions).subscribe((data) => {
      // console.log(data);
      loading.dismiss();
      // let mess = data.toString();
      // let alert = this._alertController.create({
      //   title: "Congratulations!!",
      //   subTitle: mess,
      //   buttons: ['OK']
      // });
      // alert.present();
      let loginResult: boolean = data["loginSuccess"];
      let errMessage: string = data["errMessage"];
      if (loginResult == false){
        let alert = this._alertController.create({
          title: "Login Failed!!",
          subTitle: errMessage,
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        let user: object = data["userLogin"];
        console.log(user);
        let alert = this._alertController.create({
          title: "Login successfully!!",
          //subTitle: errMessage,
          buttons: ['OK']
        });
        alert.present();
      }
    }, (error) => {
      console.log("ERROR");
      loading.dismiss();
    })
  };

  loginResponse(data) {
    console.log(data);
    let mess = data.toString();
    let alert = this._alertController.create({
      title: "Congratulations!!",
      subTitle: mess,
      buttons: ['OK']
    });
    alert.present();
  }

  btnCreateClick() {
    let apiUrl = "http://localhost/KdcTest/api/account/createnewuser";
    let objUser = {
      USERNAME: this.username,
      PASSWORD: this.password
    };

    let loading = this._loadingController.create();
    loading.present();

    this._httpClient.post(apiUrl, JSON.stringify(objUser), this._configOptions).subscribe((data) => {
      console.log(data);
      loading.dismiss();
    }, (error) => {
      console.log("proccess error");
      loading.dismiss();
    })
  }

  btnCancelClick() {
    this.username = "";
    this.password = "";
  }

}
