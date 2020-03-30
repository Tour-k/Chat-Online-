import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  username : string;

  constructor(private chatService: ChatService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
  }

  onSubmit(form: NgForm) {
    const roomName = form.value['roomName'];
    this.chatService.addRoom(roomName);
    form.reset();

  }
}
