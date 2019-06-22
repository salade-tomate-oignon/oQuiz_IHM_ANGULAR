import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// Service
import { AuthenticationService } from './authentication.service';

// Class
import { User } from '../model/user';
import { MessageSocket } from 'src/app/common/message-socket';

@Injectable()
export class FriendSocketService {
    private url = "ws://localhost:8080/oquiz/friend";
    private ws: WebSocket;
    private user: User;

    constructor( private authService: AuthenticationService) {
        this.user = this.authService.currentUserValue;
        this.ws = new WebSocket(this.url);

        this.ws.onopen = (event) => { 
            // Envoi d'un message d'authentification
            let message = new MessageSocket("authentication", "token", this.user.id, -1, null);
            this.ws.send(JSON.stringify(message));
            
            console.log("FriendSocketService: connected"); 
        } 
        this.ws.onerror = (event) => { 
            console.log("FriendSocketService: error"); 
        } 
        this.ws.onclose = (event) => { 
            console.log("FriendSocketService: closed"); 
        } 
    }

    public GetObservable(): Observable<MessageSocket>{
        return fromEvent(this.ws, 'message').pipe(
            map((event) =>{
                let data = JSON.parse(event["data"]);
                return  new MessageSocket(data.topic, data.token, data.from, data.to, data.data);
            })
        );
    }
}
