import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../app.component";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {UserService} from "../../services/getuser.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  constructor(public authService: AuthService, public router: Router,
              public http:HttpClient,
              public userService:UserService,
              public appComp:AppComponent,
              public ngzone:NgZone) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));






  }

  ngOnInit() {
    this.userService.getData().subscribe(
      data => console.log(data)
    )
  }

// login out from the app
  logOut() {
    console.log("--- log out");
    this.authService.logOut()
      .subscribe(
        data => {
          localStorage.removeItem('currentUser');
          this.appComp.deleteCookie('Authorization');
          this.appComp.deleteCookie('backCount');
          localStorage.removeItem('Authorization');
          window.location.href = '/';
          // this.router.navigate(['/login']);
        },
        error => {
          console.log(error);

        });
  }

}
