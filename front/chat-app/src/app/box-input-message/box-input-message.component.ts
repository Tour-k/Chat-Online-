import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { Room } from 'src/models/room';
import { Observable, Subscription } from 'rxjs';
 
@Component({
  selector: 'app-box-input-message',
  templateUrl: './box-input-message.component.html',
  styleUrls: ['./box-input-message.component.scss']
})
export class BoxInputMessageComponent implements OnInit, OnDestroy {

  
  currentRoom : Observable<object>;
  currentRoomSubscription : Subscription;
  registred = false;


  constructor(private chatService : ChatService) { }

  

  ngOnInit(): void {
    this.currentRoom = this.chatService.currentRoom;
    this.currentRoomSubscription = this.currentRoom.subscribe(() => this.registred = true);
  }

  ngOnDestroy(): void {
    this.currentRoomSubscription.unsubscribe()
  }

  onSubmit(form: NgForm){
    const message = form.value['msg'];
    this.chatService.sendMessage(message);
    form.reset();

  }

}
