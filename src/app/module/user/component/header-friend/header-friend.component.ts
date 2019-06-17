import { Component, OnInit } from '@angular/core';

// Service
import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from '../../service/authentication.service';
import { EventCommunicationService } from 'src/app/common/event-communication.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'user-header-friend',
    templateUrl: './header-friend.component.html',
    styleUrls: ['./header-friend.component.css']
})
export class UserHeaderFriendComponent implements OnInit {
    userId: number;
    isHidden: boolean;
    isActiveLink: object;
    eventComSubscription: Subscription;

    constructor(public global: GlobalService,
        private eventCom: EventCommunicationService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.isActiveLink = {
            "add-friend": false,
            "all-friends": false,
            "on-hold": false,
            "blocked-users": false
        };
        this.init();
        this.eventComSubscription = this.eventCom.newEventSubject.subscribe(e => {
            if (e.component === "header-left-sidebar" && e.event === "click" && e.idDom === "friends") {
                this.init();
            }
            else 
                this.isHidden = true;
        });
    }

    private activateLinkFromUrl(): void {
        this.unselectAll();

        // On attend que l'url soit mis-à-jour
        setTimeout(() => {
            let key = window.location.href.split("/").pop();
            if (key in this.isActiveLink) {   
                this.isActiveLink[key] = true;
                this.isHidden = false;
            }
            else
                this.isHidden = true;
        }, 100);
    }

    private init():void {
        this.userId = 0;
        this.activateLinkFromUrl();
        if(this.authService.currentUserValue)
            this.userId = this.authService.currentUserValue.id;
    }

    private unselectAll(): void {
        for (const key in this.isActiveLink)
            this.isActiveLink[key] = false;
    }

    public clickLink(event): void {
        this.unselectAll();
        this.isActiveLink[event.target.id] = true;
    }

}
