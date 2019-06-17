import { Component, OnInit } from '@angular/core';

// Service
import { AuthenticationService } from '../../service/authentication.service';
import { FriendService } from '../../service/friend.service';

@Component({
    selector: 'user-all-friends',
    templateUrl: './all-friends.component.html',
    styleUrls: ['./all-friends.component.css']
})
export class UserAllFriendsComponent implements OnInit {
    userId: number;
    friends: any;

    constructor(private friendService: FriendService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.userId = this.authService.currentUserValue.id;
        this.friends = [];
        this.friendService.getAllfriends(this.userId)
            .then(
                resp => {
                    // Mise-à-jour de l'affichage
                    this.friends = resp;
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
