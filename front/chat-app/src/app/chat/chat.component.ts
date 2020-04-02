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
  notificationSubscription : Subscription;

  constructor(
    private chatService: ChatService,
    private cookieService: CookieService,
    private userService: UserService,
    private notificationService : NotificationsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // console.log(this.username);
    // this.userService.getUserIdByUserName(this.username);
    this.userName = this.cookieService.get('userName');
    this.chatService.getAllRooms();
    this.notificationSubscription = this.chatService.notification.subscribe((username)=> this.createNotification(username))
  }

  ngOnDestroy(){
    this.notificationSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const roomName = form.value['roomName'];
    this.chatService.addRoom(roomName);
    form.reset();

  }

  createNotification(username){
    this.notificationService.info('Nouvelle connexion :', username + ' vient de se connecter' , {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
}
