import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  testLoginRes: Observable<object>;
  errDupEntry = false;
  errDupEntrySubscription: Subscription;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.errDupEntrySubscription = this.userService.errDupEntry.subscribe(res => {
      this.errDupEntry = res;
    });
  }

  onRegister(form: NgForm) {
    this.errDupEntry = false;
    this.userService.register(form.value);
    if ( !this.errDupEntry) {
      //TODO : set cookie for user name and user id befor redirection
      this.router.navigateByUrl('/chat');
    }
  }

  toLogin() {
    this.router.navigateByUrl('login');
  }

  toHome() {
    this.router.navigateByUrl('home');
  }


}
