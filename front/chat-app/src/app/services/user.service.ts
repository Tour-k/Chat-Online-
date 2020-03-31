import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {Room} from "../../models/room";

@Injectable()
export class UserService {

  errDupEntry = this.socket.fromEvent<boolean>('errDupEntry');
  testLoginRes = this.socket.fromEvent<boolean>('testLoginRes');
  testLoginSubscription: Subscription;
  registred = false;
  

  currentUser = this.socket.fromEvent<User>('user');
  
  //TODO currentUserName  et  currentUserIdà supprimer => utilisation du cookie 
  currentUserName: string;
  currentUserId: number;

  constructor(private socket: Socket, private router: Router) {
    this.testLoginSubscription = this.testLoginRes.subscribe((res) => {this.registred = res; this.router.navigate(['chat']);});
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
