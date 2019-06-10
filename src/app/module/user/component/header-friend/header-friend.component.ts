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
        public eventCom: EventCommunicationService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.init();
        this.isHidden = true;
        this.eventComSubscription = this.eventCom.newEventSubject.subscribe(e => {
            if (e.component === "header-left-sidebar" && e.event === "click" && e.idDom === "friends") {
                this.init();
                this.isHidden = false;
            }
            else 
                this.isHidden = true;
        });
    }

    init() {
        this.userId = 0;
        if(this.authService.currentUserValue)
            this.userId = this.authService.currentUserValue.id;
        
        this.isActiveLink = {
            "add-friend": true,
            "friends-list": false,
            "on-hold": false,
            "blocked": false
        };
    }

    unselectAll(): void {
        for (const key in this.isActiveLink)
            this.isActiveLink[key] = false;
    }

    clickLink(event): void {
        this.unselectAll();
        this.isActiveLink[event.target.id] = true;
    }

}
