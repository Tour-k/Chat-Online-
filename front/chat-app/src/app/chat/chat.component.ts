import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  userName: string;
  userId: number;

  constructor(
    private chatService: ChatService,
    private cookieService: CookieService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // console.log(this.username);
    // this.userService.getUserIdByUserName(this.username);
    this.userName = this.cookieService.get('userName');
    this.chatService.getAllRooms();
  }

  onSubmit(form: NgForm) {
    const roomName = form.value['roomName'];
    this.chatService.addRoom(roomName);
    form.reset();

  }
}
