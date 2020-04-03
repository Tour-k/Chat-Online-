import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  errDupEntry = false;
  newUser: User;
  newUserId: null;
  newUserName: string;
  userNameSend: string;

  errDupEntrySubscription: Subscription;
  newUserSubscription: Subscription;


  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.errDupEntrySubscription = this.userService.errDupEntry.subscribe(res => {
      this.errDupEntry = res;
    });
    this.newUserSubscription = this.userService.newUser.subscribe((user) => {
      this.newUserId = user[1][0].id;
      this.newUserName = user[1][0].username;
      if (!this.errDupEntry) {
        this.cookieService.set('userName', this.newUserName);
        this.cookieService.set('userId', this.newUserId);
        this.userService.setCurrentUserName(this.newUserName);
        this.userService.firstLogin();
        this.router.navigateByUrl('chat');
      }
    });
  }

  onRegister(form: NgForm) {
    this.errDupEntry = false;
    this.userService.register(form.value);
    this.userNameSend = form.value.username;
  }

  toLogin() {
    this.router.navigateByUrl('login');
  }

  toHome() {
    this.router.navigateByUrl('');
  }


}
