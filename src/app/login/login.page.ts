import { Component, OnInit } from '@angular/core';
import { LoginService, AuthResponseData } from './login.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private loginService: LoginService, private loadingCtrl: LoadingController, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.senha;

    this.authenticate(email, password);

    // console.log(email);
    // console.log(password);

    form.reset();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Entrando...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.loginService.login(email, password);
        } else {
          authObs = this.loginService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/etiqueta');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Não foi possível registrar, por favor tente novamente.';
            if (code === 'EMAIL_EXISTS') {
              message = 'E-mail já cadastrado!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'E-Mail não encontrado na base de dados.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Senha incorreta.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Autenticação falhou',
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }
}