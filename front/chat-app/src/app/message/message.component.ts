import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';
import {NgForm} from '@angular/forms';
import { Room } from 'src/models/room';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  faPen = faPen;

  messages: Observable<object>;
  messagesSubscription: Subscription;
  currentRoom: string ;
  currentRoomId : number;
  private _roomSub: Subscription;

  currentUserId : number;

  registred = false ;
  update = false;
  boolUpdateMessage = false;
  msgToUpdate : number;

  constructor(private chatServie: ChatService, private userService: UserService) { }

  ngOnInit(): void {
    this.messages = this.chatServie.messages;
    this.messagesSubscription = this.messages.subscribe(()=> {
      this.boolUpdateMessage = false;
      this.update = false});
    this._roomSub = this.chatServie.currentRoom.subscribe((room) => {
      this.currentRoom = room.nom;
      this.currentRoomId = room.id;
      this.registred = true;
      
    this.currentUserId = this.userService.currentUserId;
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
  updateMessage(msgId : number){
    this.boolUpdateMessage = true;
    this.msgToUpdate = msgId ;
  }

  onUpdateMessage(form :NgForm, id : number){
    this.chatServie.updateMessage(id, form.value.msg, this.currentRoomId);
  }

  onAnnulerUpdateMessage(){
    this.boolUpdateMessage = false;
  }
}
