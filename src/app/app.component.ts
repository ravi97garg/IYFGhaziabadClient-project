import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( private cookieService: CookieService ) { }


  setCookieValue(key:string,value:any) {
    this.cookieService.put(key, value);

  }

  getCookie(key: string){
    return this.cookieService.get(key);
  }

  //check Cookie
  //Syntax - check( name: string ): boolean;
  // checkCookie(key: string){
  //   return this.cookieService.check(key);
  // }

  //get All Cookie
  //Syntax - getAll(): {};
  getAllCookie(){
    return this.cookieService.getAll();
  }

  //delete cookiesss
  //Syntax - delete( name: string, path?: string, domain?: string ): void;
  deleteCookie(key: string){
    return this.cookieService.remove(key);
  }

  //delete All cookies
  //Syntax - deleteAll( path?: string, domain?: string ): void;
  deleteAllCookie(){
    return this.cookieService.removeAll();
  }
}
