import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-btns-nav',
  templateUrl: './btns-nav.component.html',
  styleUrls: ['./btns-nav.component.scss']
})
export class BtnsNavComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.cookieService.deleteAll();
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

}


