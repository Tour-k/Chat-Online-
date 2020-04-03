import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';
import {NgForm} from '@angular/forms';
import { Room } from 'src/models/room';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  messages: Observable<object>;
  messagesSubscription: Subscription;
  currentRoom: string ;
  currentRoomId : number;
  private _roomSub: Subscription;

  registred = false ;
  update = false;

  constructor(private chatServie: ChatService) { }

  ngOnInit(): void {
    this.messages = this.chatServie.messages;
    this.messagesSubscription = this.messages.subscribe(() => this.update = false);
    this._roomSub = this.chatServie.currentRoom.subscribe((room) => {
      this.currentRoom = room.nom;
      this.currentRoomId = room.id;
      this.registred = true;
    });
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
    this._roomSub.unsubscribe();
  }

  updateRoom(){
    this.update = true;
  }

  onUpdate(form :NgForm){
    this.chatServie.updateRoom(this.currentRoomId, form.value.roomName);
  }
  onAnnuler(){
    this.update = false;
  }
}
