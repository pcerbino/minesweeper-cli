import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  
  constructor(
    private modalController: ModalController, 
    private authService: AuthService, 
    private navCtrl: NavController, 
    private alertService: AlertService, 
    public menuCtrl: MenuController) { }
  
  ngOnInit() { }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async login() {
    this.navCtrl.navigateRoot('/login');
  }
  
  register(form: NgForm) {
    
    this.authService.register(form.value.name, form.value.email, form.value.password).subscribe(data => {
        
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {
          },
          error => {
            console.log("--",error);
            
          },
          () => {
            this.navCtrl.navigateRoot('/login');
          }
        );
        this.alertService.presentToast("You can login with your credentials");
      },

      error => {
        if (typeof error.error.errors.email != "undefined")
          this.alertService.presentToast(error.error.errors.email);
        
        if (typeof error.error.errors.name != "undefined")
          this.alertService.presentToast(error.error.errors.name);
        console.log(error);
      },
      () => {
        
      }
    );
  }
}