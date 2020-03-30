import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';
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
  private _roomSub: Subscription;

  registred = false ;

  constructor(private chatServie: ChatService) { }

  ngOnInit(): void {
    this.messages = this.chatServie.messages;
    this.messagesSubscription = this.messages.subscribe();
    this._roomSub = this.chatServie.currentRoom.subscribe((room) => {
      this.currentRoom = room.nom;
      this.registred = true;
    });
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
    this._roomSub.unsubscribe();
  }
}
