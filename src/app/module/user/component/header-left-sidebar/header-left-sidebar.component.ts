import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Service
import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from '../../service/authentication.service';
import { EventCommunicationService } from 'src/app/common/event-communication.service';

@Component({
    selector: 'user-header-left-sidebar',
    templateUrl: './header-left-sidebar.component.html',
    styleUrls: ['./header-left-sidebar.component.css']
})
export class HeaderLeftSidebarComponent implements OnInit, OnDestroy {
    userId: number;
    widthSidebar: number; 
    isActiveLink: object;
    connectedSubscription: Subscription;
    eventComSubscription: Subscription;

    constructor(public global: GlobalService,
        private eventCom: EventCommunicationService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.isActiveLink = {
            friends: false,
            discussions: false,
            gaming: false
        };
        this.connectedSubscription = this.authService.connected.subscribe(isConnected => {
            this.init();
            if (isConnected)
                setTimeout(() => {
                    this.userId = this.authService.currentUserValue.id;
                }, 100);
        });
        this.eventComSubscription = this.eventCom.newEventSubject.subscribe(e => {
            if (e.component === "header-right-sidebar" && e.event === "click")
                this.unselectAll();
        });
        this.init();
    }

    ngOnDestroy(): void {
        if (this.connectedSubscription)
            this.connectedSubscription.unsubscribe();
        if (this.eventComSubscription)
            this.eventComSubscription.unsubscribe();
        console.log("header-left-sidebar.component: destroyed!");
    }

    private activateLinkFromUrl(): void {
        this.unselectAll();
        let friendsLinks = ["add-friend", "all-friends", "on-hold", "blocked-users"];
        let discussionsLinks = ["discussions"];
        let gamingLinks = ["gaming"];

        // On attend que l'url soit mis-à-jour
        setTimeout(() => {
            let key = window.location.href.split("/").pop();

            if(friendsLinks.indexOf(key) != -1)
                this.isActiveLink["friends"] = true;
            if(discussionsLinks.indexOf(key) != -1)
                this.isActiveLink["discussions"] = true;
            if(gamingLinks.indexOf(key) != -1)
                this.isActiveLink["gaming"] = true;
        }, 100);
    }

    private init() {
        this.activateLinkFromUrl();
        this.widthSidebar = 0;
        this.userId = 0;
        if(this.authService.currentUserValue)
            this.userId = this.authService.currentUserValue.id;
    }

    public showSidebar(): void {
        this.widthSidebar = 200;
    }

    public hideSidebar(): void {
        this.widthSidebar = 0;
    }

    private unselectAll(): void {
        for (const key in this.isActiveLink)
            this.isActiveLink[key] = false;
    }
    
    public clickLink(event): void {
        this.eventCom.newEventSubject.next({
            component: "header-left-sidebar",
            event: "click",
            idDom: event.target.id
        })
        this.unselectAll();
        this.isActiveLink[event.target.id] = true;
    }

}
