import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  constructor( 
      private modalController: ModalController, 
      private authService: AuthService, 
      private navCtrl: NavController, 
      private alertService: AlertService, 
      public menuCtrl: MenuController) { }

  ngOnInit() { 

  }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }  
  
  register() {

    this.navCtrl.navigateRoot('/register');
  }

  login(form: NgForm) {

    this.authService.login(form.value.email, form.value.password).subscribe(data => {
      
        this.alertService.presentToast("Logged In");
      },
      error => {
        console.log(error);
        this.alertService.presentToast("Autorization error");
      },
      () => {

        this.navCtrl.navigateRoot('/board');
      }
    );
  }
}