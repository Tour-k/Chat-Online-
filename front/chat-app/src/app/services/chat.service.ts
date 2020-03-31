import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from 'src/models/room';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

// import { fromEvent } from 'rxjs'
// import { Room } from 'src/models/room';


@Injectable()
export class ChatService {


    currentRoom = this.socket.fromEvent<Room>('room'); 

    rooms = this.socket.fromEvent<any>('rooms');

    messages = this.socket.fromEvent<any>('messages');


    constructor(private socket: Socket, private userService : UserService ) {}

    

    //TODO: Ajouter le UserId correspondant à addRoom
    addRoom(roomName: string){
        const roomObject = {
            id: null,
            nom: '',
            userId: 1 //ON EST EN DUR ICI POUR LE TEST VERS LA BDD
        };
        roomObject.userId = this.userService.currentUserId;
        roomObject.nom = roomName;
        this.socket.emit('addRoom' , roomObject);
    }

    deleteRoom(roomId: number){
        this.socket.emit('deleteRoom', roomId);
    }

    getAllMessagesByRoomId(roomId: number) {
        this.socket.emit('getRoom', roomId);
    }

    sendMessage(Channel_id, User_id, msg: string) {
        this.socket.emit('addMessage', [Channel_id, User_id, msg]);
    }

    getAllRooms(){
        this.socket.emit('getAllRooms');
    }

    // getMessage(){
    //     return this.socket.fromEvent("message"), map( data => data.msg);
    // }

}
