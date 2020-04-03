import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  userName: string;
  userId: number;
  notificationInSubscription: Subscription;
  notificationOutSubscription: Subscription;

  constructor(
    private chatService: ChatService,
    private cookieService: CookieService,
    private userService: UserService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    // console.log(this.username);
    // this.userService.getUserIdByUserName(this.username);
    this.userName = this.userService.currentUserName;
    this.chatService.getAllRooms();
    this.notificationInSubscription = this.chatService.notificationIn.subscribe((username) => this.createNotificationIn(username));
    this.notificationOutSubscription = this.chatService.notificationOut.subscribe((username) => this.createNotificationOut(username));
  }

  ngOnDestroy() {
    this.notificationInSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const roomName = form.value['roomName'];
    this.chatService.addRoom(roomName);
    form.reset();

  }

  createNotificationIn(username) {
    this.notificationService.info('Nouvelle connexion :', username + ' vient de se connecter à ce chat' , {
      timeOut: 6000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  createNotificationOut(username) {
    this.notificationService.info('INFO', username + ' est sortit de ce chat', {
      timeOut: 6000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

}
