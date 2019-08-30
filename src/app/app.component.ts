import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private loginService: LoginService,
    private route: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout() {
    this.loginService.logout();
  }

  
}
