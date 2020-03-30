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

  
  roomName : string 
  currentRoomSubscription : Subscription;
  registred = false;

  Channel_id : number;

  // TODO : Ajouter logique pour récupérer le User ID  
  User_id : number; 

  constructor(private chatService : ChatService) { }

  

  ngOnInit(): void {
    this.currentRoomSubscription = this.chatService.currentRoom.subscribe((room) => {
      this.registred = true;
      this.Channel_id = room.id;
      this.roomName = room.nom;
    });
  }

  ngOnDestroy(): void {
    this.currentRoomSubscription.unsubscribe()
  }

  onSubmit(form: NgForm){
    //TODO : récupérer le USER ID 
    this.User_id = 1;
    const message = form.value['msg'];
    this.chatService.sendMessage(this.Channel_id, this.User_id , message );
    form.reset();

  }

}
