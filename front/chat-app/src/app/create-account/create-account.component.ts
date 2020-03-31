import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    this.userService.register(form.value);
    this.router.navigateByUrl('/chat');
  }

  toLogin() {
    this.router.navigateByUrl('login');
  }

  toHome() {
    this.router.navigateByUrl('home');
  }


}
