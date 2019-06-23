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
    isLoading: boolean;

    constructor(private friendService: FriendService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.userId = this.authService.currentUserValue.id;
        this.friends = [];
        this.isLoading = true;

        // Requête adressée à l'API REST
        this.friendService.getAllfriends(this.userId)
            .then(
                resp => {
                    // Mise-à-jour de l'affichage
                    this.friends = resp;
                    this.isLoading = false;
                })
            .catch(
                // Erreur 
                err => {
                    this.isLoading = false;
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

    public block(otherUserId, index) {
        // Requête adressée à l'API REST
        this.friendService.blockUser(this.userId, otherUserId).then(
            resp => {
                this.friends.splice(index, 1);
            }
        )
    }
    
    public remove(otherUserId, index) {
        // Requête adressée à l'API REST
        this.friendService.removeFriend(this.userId, otherUserId).then(
            resp => {
                this.friends.splice(index, 1);
            }
        )
    }
}
