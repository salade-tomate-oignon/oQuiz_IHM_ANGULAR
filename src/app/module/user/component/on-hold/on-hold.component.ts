import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Service
import { AuthenticationService } from '../../service/authentication.service';
import { FriendService } from '../../service/friend.service';
import { FriendSocketService } from '../../service/friend-socket.service';

@Component({
    selector: 'user-on-hold',
    templateUrl: './on-hold.component.html',
    styleUrls: ['./on-hold.component.css']
})
export class UserOnHoldComponent implements OnInit, OnDestroy {
    userId: number;
    friendRequests: Array<any>;
    socketSubscription: Subscription;

    constructor(private friendService: FriendService,
        private friendSocketService: FriendSocketService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.userId = this.authService.currentUserValue.id;
        this.friendRequests = [];

        // Écoute des messages envoyés par le <socket server> 
        this.socketSubscription = this.friendSocketService.GetObservable().subscribe(
            // Réception d'un message du <Socket Server>
            message => {
                if(message.topic == "on hold"){
                    this.addRequest(message.data);
                }
        })

        // Requête adressée à l'API REST
        this.friendService.getAllfriendRequests(this.userId)
            .then(
                resp => {
                    // Mise-à-jour de l'affichage
                    this.friendRequests = resp;
                })
            .catch(
                // Erreur 
                err => {
                    if (Array.isArray(err.error)) {
                        err.error.forEach(elm => {
                            switch (elm.codeError) {
                                default:
                                    console.log("Le serveur a rencontré un problème")
                                    break;
                            }                    
                        });
                    }
                }
            );
    }

    ngOnDestroy(): void {
        if (this.socketSubscription)
            this.socketSubscription.unsubscribe();
        console.log("user-on-hold.component: destroyed!");
    }

    public accept(otherUserId, index) {
        // Requête adressée à l'API REST
        this.friendService.acceptFriendRequest(this.userId, otherUserId).then(
            resp => {
                this.friendRequests.splice(index, 1);
            }
        )
    }
    
    public decline(otherUserId, index) {
        // Requête adressée à l'API REST
        this.friendService.declineFriendRequest(this.userId, otherUserId).then(
            resp => {
                this.friendRequests.splice(index, 1);
            }
        )
    }
    
    public block(otherUserId, index) {
        // Requête adressée à l'API REST
        this.friendService.blockUser(this.userId, otherUserId).then(
            resp => {
                this.friendRequests.splice(index, 1);
            }
        )
    }

    private addRequest(data: any) {
        let isAdded = false;

        this.friendRequests.forEach((elm, index) => {
            if(elm.id == data.id) {
                isAdded = true;
                this.friendRequests.splice(index, 1);
                this.friendRequests.unshift(elm);
            }
        });
        
        if(!isAdded) {
            this.friendRequests.unshift(data);
        }
    }
}
