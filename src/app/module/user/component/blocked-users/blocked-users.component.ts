import { Component, OnInit } from '@angular/core';

// Service
import { AuthenticationService } from '../../service/authentication.service';
import { FriendService } from '../../service/friend.service';

@Component({
    selector: 'user-blocked-users',
    templateUrl: './blocked-users.component.html',
    styleUrls: ['./blocked-users.component.css']
})
export class UserBlockedUsersComponent implements OnInit {
    userId: number;
    blockedUsers: any;

    constructor(private friendService: FriendService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.userId = this.authService.currentUserValue.id;
        this.blockedUsers = [];
        this.friendService.getAllBlockedfriends(this.userId)
            .then(
                resp => {
                    // Mise-à-jour de l'affichage
                    this.blockedUsers = resp;
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
