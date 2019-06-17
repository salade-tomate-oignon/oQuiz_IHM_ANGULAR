import { Component, OnInit } from '@angular/core';

// Service
import { AuthenticationService } from '../../service/authentication.service';
import { FriendService } from '../../service/friend.service';

@Component({
    selector: 'user-on-hold',
    templateUrl: './on-hold.component.html',
    styleUrls: ['./on-hold.component.css']
})
export class UserOnHoldComponent implements OnInit {
    userId: number;
    friendRequests: any;

    constructor(private friendService: FriendService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.userId = this.authService.currentUserValue.id;
        this.friendRequests = [];
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

}
