import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from "./services/auth.service";
import {AccountService} from "./services/account.service";
import { ProfileComponent } from './components/profile/profile.component';
import {routing} from "./app.routing";
import {UrlPermission} from "./urlPermission/url.permission";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserService} from "./services/getuser.service";
import { CookieService } from 'angular2-cookie/services/cookies.service';

import {HttpModule} from "@angular/http";
import {MDBBootstrapModule} from "../../mdb-angular-free-6.1.2/angular-bootstrap-md/angular-bootstrap-md";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      setHeaders: {
        Authorization: localStorage.getItem("Authorization"),
        'X-Requested-With' : 'XMLHttpRequest'
      }
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,routing,HttpClientModule,MDBBootstrapModule,
  ],
  providers: [AuthService,AppComponent,AccountService,CookieService,UrlPermission,UserService,{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

