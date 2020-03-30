import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login-with-account',
  templateUrl: './login-with-account.component.html',
  styleUrls: ['./login-with-account.component.css']
})
export class LoginWithAccountComponent implements OnInit {

  testLoginRes: Observable<object>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.testLoginRes = this.userService.testLoginRes;
  }

  onConnexion(form: NgForm) {
    this.userService.login(form.value);
    /*this.router.navigateByUrl('/chat');*/
  }

  toString() {
    alert(JSON.stringify(this.testLoginRes));
  }
}
