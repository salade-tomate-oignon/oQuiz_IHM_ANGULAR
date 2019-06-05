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
        public eventCom: EventCommunicationService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.init();
        this.connectedSubscription = this.authService.connected.subscribe(isConnected => {
            this.init();
            if (isConnected)
                setTimeout(() => {
                    this.userId = this.authService.currentUserValue.id;
                }, 100);
        });
        this.eventComSubscription = this.eventCom.newEventSubject.subscribe(e => {
            if (e.component === "R" && e.event === "click" && e.idDom === "a")
                this.unselectAll();
        });
    }

    ngOnDestroy(): void {
        if (this.connectedSubscription)
            this.connectedSubscription.unsubscribe();
        if (this.eventComSubscription)
            this.eventComSubscription.unsubscribe();
        console.log("header-left-sidebar.component: destroyed!");
    }

    private init() {
        this.userId = 0;
        if(this.authService.currentUserValue)
            this.userId = this.authService.currentUserValue.id;
        
        this.widthSidebar = 0;
        this.isActiveLink = {
            friends: false,
            discussions: false
        };
    }

    showSidebar(): void {
        this.widthSidebar = 200;
    }

    hideSidebar(): void {
        this.widthSidebar = 0;
    }

    unselectAll(): void {
        for (const key in this.isActiveLink)
            this.isActiveLink[key] = false;
    }
    
    clickLink(event): void {
        this.eventCom.newEventSubject.next({
            component: "L",
            event: "click",
            idDom: "a"
        })
        this.unselectAll();
        this.isActiveLink[event.target.id] = true;
    }

}
