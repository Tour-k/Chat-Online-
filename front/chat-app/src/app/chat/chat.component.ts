import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    
    const roomName = form.value['roomName'];
    this.chatService.addRoom(roomName);
    form.reset();

  }
}
