import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { HttpHeaders} from "@angular/common/http";
import {User} from "../model/model.user";

import {AppComponent} from "../app.component";
import { environment } from '../../environments/environment';
import {RequestOptions} from "http";

@Injectable()
export class AuthService {
  static base64Credential:string;
  constructor(public http: HttpClient,public appComp:AppComponent) { }

  public logIn(user: User){

    let headers = new Headers();
    headers.append('Accept', 'application/json')
    // creating base64 encoded String from user name and password
   AuthService.base64Credential= btoa( user.username+ ':' + user.password);
    headers.append("Authorization", "Basic " + AuthService.base64Credential);
    headers.append('X-Requested-With','XMLHttpRequest');

    let options = new RequestOptions();
    options.headers=headers;

    return this.http.get(environment.API_URL+"/account/login" ,   options);

  }

  logOut() {
    // remove user from local storage to log user out
    console.log(this.appComp.getCookie('Authorization') +"  service");

    return this.http.post(environment.API_URL+"/account/logout",{});

  }
}
