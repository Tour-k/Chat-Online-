import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  messages : Observable<object>;
  messagesSubscription : Subscription;

  constructor(private chatServie : ChatService) { }

  onSubmit(form: NgForm){
    form.reset();
  }

  ngOnInit(): void {
    this.messages = this.chatServie.messages;
    this.messagesSubscription = this.messages.subscribe()

  }

  ngOnDestroy(){
    this.messagesSubscription.unsubscribe()
  }

}
