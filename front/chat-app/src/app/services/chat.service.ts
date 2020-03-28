import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from 'src/models/room';
// import { map } from 'rxjs/operators';

@Injectable()
export class ChatService { 

    currentRoom = this.socket.fromEvent<Room>('room');
    rooms = this.socket.fromEvent<any>('rooms');

    messages = this.socket.fromEvent<any>('messages')


    constructor(private socket: Socket){}

    

    //TODO: Ajouter le UserId correspondant à addRoom
    addRoom(roomName: string){
        const roomObject = {
            'id' : null,
            'name' : '',
            'userId':1 //ON EST EN DUR ICI POUR LE TEST VERS LA BDD
        };
        roomObject.name = roomName;
        this.socket.emit('addRoom' , roomObject);
    }

    deleteRoom(roomId: number){
        this.socket.emit('deleteRoom', roomId);
    }

    getAllMessagesByRoomId(roomId : number){    
        this.socket.emit('getRoom', roomId);
    }

    sendMessage(msg: string){
        this.socket.emit('message', msg);
    }

    // getMessage(){
    //     return this.socket.fromEvent("message"), map( data => data.msg);
    // }

}