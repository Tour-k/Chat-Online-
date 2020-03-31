import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { Room } from 'src/models/room';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
 
@Component({
  selector: 'app-box-input-message',
  templateUrl: './box-input-message.component.html',
  styleUrls: ['./box-input-message.component.scss']
})
export class BoxInputMessageComponent implements OnInit, OnDestroy {
  registred = false;

  channelId: number;
  roomName: string ;
  currentRoomSubscription: Subscription;

  userId: number;
  userName: string;

  constructor(private cookieService: CookieService, private chatService: ChatService, private userService: UserService) {
   }

  ngOnInit(): void {
    this.currentRoomSubscription = this.chatService.currentRoom.subscribe((room) => {
      this.registred = true;
      this.channelId = room.id;
      this.roomName = room.nom;

    });
    this.userName = this.cookieService.get('userName');
    this.userId = parseInt(this.cookieService.get('userId'));
  }

  ngOnDestroy(): void {
    this.currentRoomSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const message = form.value['msg'];
    this.chatService.sendMessage(this.channelId, this.userId , message );
    form.reset();
  }
}
