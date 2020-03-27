import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import { map } from 'rxjs/operators';

@Injectable()
export class ChatService { 

    rooms = [
        {
            'id':1,
            'name':'test'
        }
    ]

    constructor(private socket: Socket){}

    getRooms(roomId : number){    
        this.socket.emit('getRoom', roomId);
    }


    addRoom(roomName: string){
        const roomObject = {
            'id' : 0,
            'name' : ''
        }
        roomObject.name = roomName;
        roomObject.id = this.rooms[(this.rooms.length - 1)].id +1;
        this.rooms.push(roomObject);
        console.log(roomObject);
        this.socket.emit('addRoom' , roomObject);
    }



    sendMessage(msg: string){
        this.socket.emit('message', msg);
    }

    // getMessage(){
    //     return this.socket.fromEvent("message"), map( data => data.msg);
    // }

}