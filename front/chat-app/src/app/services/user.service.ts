import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/models/user';
import { Subscription } from 'rxjs';

@Injectable()
export class UserService {

  testLoginRes = this.socket.fromEvent<boolean>('testLoginRes');
  testLoginSubscription : Subscription;
  registred = false;
  

  currentUser = this.socket.fromEvent<User>('user');
  
  //TODO currentUserName  et  currentUserIdà supprimer => utilisation du cookie 
  currentUserName: string;
  currentUserId: number;

  constructor(private socket: Socket) {
    this.testLoginSubscription = this.testLoginRes.subscribe((res) => {this.registred = res;});
  }

  register(values: any) {
    this.socket.emit('newUser', values);
  }

  login(values: any) {
    this.socket.emit('getUser', values);
    this.socket.emit('getAllRooms');
  }

  getUserIdByUserName(username) {
    this.socket.emit('getUserId', username);
  }

  //TODO a supprimer 
  setCurrentUserName(username) {
    this.currentUserName = username ;
  }
  //TODO a supprimer 
  setCurrentUserId(userid) {
    this.currentUserId = userid ;
  }

}
