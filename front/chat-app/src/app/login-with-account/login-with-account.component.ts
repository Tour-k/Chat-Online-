import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-with-account',
  templateUrl: './login-with-account.component.html',
  styleUrls: ['./login-with-account.component.css']
})
export class LoginWithAccountComponent implements OnInit, OnDestroy {

  private cookieValue: string;

  testLoginRes: Observable<object>;
  registred = false ;
  currentUsername: string;
  currentUsernameSubscription: Subscription;

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.testLoginRes = this.userService.testLoginRes;

    this.currentUsernameSubscription = this.userService.currentUser.subscribe((user) => {
      this.cookieService.set('userName', user.username);
      this.cookieService.set('userId', user.id.toString());

      this.currentUsername = user.username;
      this.registred = true;
      console.log(this.currentUsername);
      if (this.registred) {
        this.userService.setCurrentUserId(user.id);
        this.userService.setCurrentUserName(user.username);
        this.router.navigate(['chat']);
      }
    });
  }

  ngOnDestroy(): void {
    this.currentUsernameSubscription.unsubscribe();
  }

  onConnexion(form: NgForm) {
    this.userService.login(form.value);
  }

  toSignUp() {
    this.router.navigateByUrl('register');
  }

  toHome() {
    this.router.navigateByUrl('home');
  }
}
