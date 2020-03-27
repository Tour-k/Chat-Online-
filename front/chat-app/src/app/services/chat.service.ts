import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from 'src/models/room';
// import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {

    currentRoom = this.socket.fromEvent<Room>('room');
    rooms = this.socket.fromEvent<any>('rooms');

    roomsLOGIC = [
        {
            id: 1,
            name: 'test'
        }
    ];

    constructor(private socket: Socket, private room: Room) {}

    getRoom(roomId: number){
        this.socket.emit('getRoom', roomId);
    }
    addRoom(roomName: string){
        const roomObject = {
            id: 0,
            name: '',
            userId: 1 //ON EST EN DUR ICI POUR LE TEST VERS LA BDD
        };
        roomObject.name = roomName;
        roomObject.id = this.roomsLOGIC[(this.roomsLOGIC.length - 1)].id +1;
        this.roomsLOGIC.push(roomObject);
        this.socket.emit('addRoom' , roomObject);
    }

    sendMessage(msg: string){
        this.socket.emit('message', msg);
    }

    // getMessage(){
    //     return this.socket.fromEvent("message"), map( data => data.msg);
    // }

}
