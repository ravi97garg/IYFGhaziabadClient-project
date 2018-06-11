import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AppComponent} from "../app.component";

@Injectable()
export class UrlPermission implements  CanActivate {

  constructor(private router: Router,
              public appComp:AppComponent) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.appComp.getCookie("Authorization"));
    if (this.appComp.getCookie("Authorization")!=null) {
      console.log(this.appComp.getCookie("Authorization") +" url comp");
      //
      // this.router.navigate(['/profile']);

      // logged in so return true
      return true;
    }
console.log("------------  url");
    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('/login', { queryParams: { returnUrl: state.url }});
    return false;
  }
}
