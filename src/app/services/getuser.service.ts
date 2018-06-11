import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(public http: HttpClient) {
  }

  public getData() {

    return this.http.get(environment.API_URL + '/account/user');


  }

}
