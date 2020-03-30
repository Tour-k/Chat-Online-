import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-login-with-account',
  templateUrl: './login-with-account.component.html',
  styleUrls: ['./login-with-account.component.css']
})
export class LoginWithAccountComponent implements OnInit {

  testLoginRes: Observable<object>;
  
  registred = false ; 
  currentUsername : string;
  currentUsernameSubscription : Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.testLoginRes = this.userService.testLoginRes;

    this.currentUsernameSubscription = this.userService.currentUser.subscribe((user)=>{
      this.currentUsername = user.username;
      this.registred = true;
      console.log(this.currentUsername);
      if (this.registred){
        this.router.navigate(['chat/' + this.currentUsername]);
      }
    })
  }

  onConnexion(form: NgForm) {
    this.userService.login(form.value);
  }

  toString() {
    alert(JSON.stringify(this.testLoginRes));
  }
}
