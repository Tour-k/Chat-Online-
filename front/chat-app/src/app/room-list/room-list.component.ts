import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {


  rooms: Observable<object>;
  currentRoom: object;
  roomSubscription: Subscription;
  faTrash = faTrash;

  constructor(private chatService: ChatService) { }
  

  ngOnInit(): void {
    this.rooms = this.chatService.rooms;
  }
 
  loadRoom(id: number) {
    this.chatService.getAllMessagesByRoomId(id);  
  }

  deleteRoom(id: number) {
    this.chatService.deleteRoom(id);
  }
}
