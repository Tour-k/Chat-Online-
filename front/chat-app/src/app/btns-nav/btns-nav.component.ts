import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btns-nav',
  templateUrl: './btns-nav.component.html',
  styleUrls: ['./btns-nav.component.scss']
})
export class BtnsNavComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/');
  }

}
