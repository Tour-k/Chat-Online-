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

  errDupEntrySubscription: Subscription;
  newUserSubscription: Subscription;


  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.errDupEntrySubscription = this.userService.errDupEntry.subscribe(res => {
      this.errDupEntry = res;
    });
    this.newUserSubscription = this.userService.newUser.subscribe((user) => {
      console.log(user[0].insertId);
      this.newUserId = user[0].insertId;
    });
  }

  onRegister(form: NgForm) {
    this.errDupEntry = false;
    this.userService.register(form.value);
    if (this.errDupEntry) {
      return
    } else {
      this.cookieService.set('userName', form.value.username);
      this.cookieService.set('userId', this.newUserId);
     // var values = [];
     // this.userService.login([username:form.value.username, password:form.value.username ]);
    }
  }

  toLogin() {
    this.router.navigateByUrl('login');
  }

  toHome() {
    this.router.navigateByUrl('');
  }


}
