import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable()
export class ChatService { 

    constructor(private socket: Socket){}

    getRooms(roomId : number){    
        this.socket.emit('getRoom', roomId);
    }




    addRoom(room: object){
        this.socket.emit('addRoom' , room);
    }



    sendMessage(msg: string){
        this.socket.emit('message', msg);
    }

    getMessage(){
        return this.socket.fromEvent("message").map( data => data.msg);
    }

}