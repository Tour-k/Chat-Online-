import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/models/user';

@Injectable()
export class UserService {

  testLoginRes = this.socket.fromEvent<any>('testLoginRes');

  currentUser = this.socket.fromEvent<User>('user');

  constructor(private socket: Socket) {}

  register(values : any) {
    this.socket.emit('newUser', values);
  }

  login(values : any) {
    this.socket.emit('getUser', values);
    this.socket.emit('getAllRooms');
    
  }


}
