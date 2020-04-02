import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  errDupEntry = false;
  errDupEntrySubscription: Subscription;
  username = null;
  userId = null;

  currentUserSubscription: Subscription;


  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.errDupEntrySubscription = this.userService.errDupEntry.subscribe(res => {
      this.errDupEntry = res;
    });
    this.currentUserSubscription = this.userService.currentUser.subscribe((user) => {
      this.username = user.username;
      this.userId = user.id;
      console.log('coucou test in create account TS');
    });
  }

  onRegister(form: NgForm) {
    this.errDupEntry = false;
    this.userService.register(form.value);
    if ( !this.errDupEntry) {
      console.log('user name from form : ' + form.value.username);

      //this.cookieService.set('userName', );
      //this.userService.getUserIdByUserName(form.value.username);
      //this.cookieService.set('userId', user.id.toString());
      //this.router.navigateByUrl('/chat');
    }
  }

  toLogin() {
    this.router.navigateByUrl('login');
  }

  toHome() {
    this.router.navigateByUrl('');
  }


}
