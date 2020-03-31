import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { Room } from 'src/models/room';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
 
@Component({
  selector: 'app-box-input-message',
  templateUrl: './box-input-message.component.html',
  styleUrls: ['./box-input-message.component.scss']
})
export class BoxInputMessageComponent implements OnInit, OnDestroy {
  registred = false;

  // @Input() username : string; 

  Channel_id: number;
  roomName: string ;
  currentRoomSubscription: Subscription;

  userId: number;
  username : string;
  

  constructor(private chatService: ChatService, private userService: UserService) {
    
   }

  ngOnInit(): void {
    this.currentRoomSubscription = this.chatService.currentRoom.subscribe((room) => {
      this.registred = true;
      this.Channel_id = room.id;
      this.roomName = room.nom;

    });
    this.username = this.userService.currentUserName
  }

  ngOnDestroy(): void {
    this.currentRoomSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const message = form.value['msg'];
    this.userId = this.userService.currentUserId;
    this.chatService.sendMessage(this.Channel_id, this.userId , message );
    form.reset();
  }
}
