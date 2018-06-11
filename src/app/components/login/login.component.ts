import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../model/model.user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router
    , public appComp: AppComponent,
              public ngzone: NgZone) {
  }

  public backCount: number;


  ngOnInit() {
    if (this.appComp.getCookie('Authorization') != null) {

      this.router.navigate(['/profile'], {replaceUrl: true});
    }


    console.log('-------------   login oninit');
  }

  login() {
    this.authService.logIn(this.user)
      .subscribe(data => {
        let user = data.json().principal;// the returned user object is a principal object
        if (user) {
          // store user details  in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.appComp.setCookieValue('Authorization', 'Basic ' + AuthService.base64Credential);
          this.appComp.setCookieValue('backCount', 0);
          localStorage.setItem('Authorization', 'Basic ' + AuthService.base64Credential);
          this.router.navigate(['/profile'], {replaceUrl: true});
        }
      }
    );
  }
}
