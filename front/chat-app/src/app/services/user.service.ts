import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class UserService {

  testLoginRes = this.socket.fromEvent<any>('testLoginRes');

  constructor(private socket: Socket) {}

  register(values) {
    this.socket.emit('newUser', values);
  }

  login(values) {
    this.socket.emit('getUser', values);
  }


}
