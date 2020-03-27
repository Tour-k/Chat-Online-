import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {

  rooms: Observable<object>;
  currentRoom: object;
  roomSubscription: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.rooms = this.chatService.rooms;
    this.roomSubscription = this.chatService.currentRoom.subscribe(room => this.currentRoom = room);
  }
  ngOnDestroy() {
    this.roomSubscription.unsubscribe();
  }

  loadRoom(id: number) {
    console.log(id + ' test load room ');
    this.chatService.getRoom(id);
  }

}
