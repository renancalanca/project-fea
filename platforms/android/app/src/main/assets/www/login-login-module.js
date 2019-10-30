(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/login/login.page.ts");







var routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/login/login.page.html":
/*!***************************************!*\
  !*** ./src/app/login/login.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>{{ isLogin ? 'Login' : 'Cadastrar' }}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\">\n    <ion-card>\n      <ion-item>\n        <ion-label position=\"floating\">Email</ion-label>\n        <ion-input id=\"txtEmail\" ngModel name=\"email\" required email #emailCtrl=\"ngModel\">\n        </ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-item *ngIf=\"!emailCtrl.valid && emailCtrl.touched\" lines=\"none\">\n          <ion-label>\n            Email inválido.\n          </ion-label>\n        </ion-item>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"floating\"> Senha </ion-label>\n        <ion-input type=\"password\" ngModel name=\"senha\" required minlength=\"6\" #passwordCtrl=\"ngModel\" id=\"txtSenha\">\n        </ion-input>\n      </ion-item>\n      <ion-item *ngIf=\"!passwordCtrl.valid && passwordCtrl.touched \" lines=\"none\">\n        <ion-label>\n          Senha deve conter pelo menos 6 caracteres.\n        </ion-label>\n      </ion-item>\n      <ion-button type=\"button\" color=\"primary\" fill=\"clear\" expand=\"block\" (click)=\"onSwitchAuthMode()\">\n        {{ isLogin ? 'Cadastrar' : 'Login' }}\n      </ion-button>\n      <ion-button type=\"submit\" color=\"primary\" expand=\"block\" [disabled]=\"!f.valid\">\n        {{ isLogin ? 'Login' : 'Cadastrar' }}\n      </ion-button>\n    </ion-card>\n  </form>\n</ion-content>"

/***/ }),

/***/ "./src/app/login/login.page.scss":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#ion-header {\n  background-color: var(--ion-color-primary); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vQzpcXEZhY3VsZGFkZVxcVENDXFxwcm9qZWN0LWZlYS9zcmNcXGFwcFxcbG9naW5cXGxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDBDQUEwQyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2lvbi1oZWFkZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/login/login.page.ts":
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.service */ "./src/app/login/login.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var LoginPage = /** @class */ (function () {
    function LoginPage(loginService, loadingCtrl, router, alertCtrl) {
        this.loginService = loginService;
        this.loadingCtrl = loadingCtrl;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.isLoading = false;
        this.isLogin = true;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.onSubmit = function (form) {
        if (!form.valid) {
            return;
        }
        var email = form.value.email;
        var password = form.value.senha;
        this.authenticate(email, password);
        // console.log(email);
        // console.log(password);
        form.reset();
    };
    LoginPage.prototype.onSwitchAuthMode = function () {
        this.isLogin = !this.isLogin;
    };
    LoginPage.prototype.authenticate = function (email, password) {
        var _this = this;
        this.isLoading = true;
        this.loadingCtrl
            .create({ keyboardClose: true, message: 'Entrando...' })
            .then(function (loadingEl) {
            loadingEl.present();
            var authObs;
            if (_this.isLogin) {
                authObs = _this.loginService.login(email, password);
            }
            else {
                authObs = _this.loginService.signup(email, password);
            }
            authObs.subscribe(function (resData) {
                console.log(resData);
                _this.isLoading = false;
                loadingEl.dismiss();
                _this.router.navigateByUrl('/etiqueta');
            }, function (errRes) {
                loadingEl.dismiss();
                var code = errRes.error.error.message;
                var message = 'Não foi possível registrar, por favor tente novamente.';
                if (code === 'EMAIL_EXISTS') {
                    message = 'E-mail já cadastrado!';
                }
                else if (code === 'EMAIL_NOT_FOUND') {
                    message = 'E-Mail não encontrado na base de dados.';
                }
                else if (code === 'INVALID_PASSWORD') {
                    message = 'Senha incorreta.';
                }
                _this.showAlert(message);
            });
        });
    };
    LoginPage.prototype.showAlert = function (message) {
        this.alertCtrl
            .create({
            header: 'Autenticação falhou',
            message: message,
            buttons: ['Ok']
        })
            .then(function (alertEl) { return alertEl.present(); });
    };
    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.page.html */ "./src/app/login/login.page.html"),
            styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/login/login.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map