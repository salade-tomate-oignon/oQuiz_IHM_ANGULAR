import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Service
import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from '../../service/authentication.service';
import { EventCommunicationService } from 'src/app/common/event-communication.service';

@Component({
    selector: 'user-header-right-sidebar',
    templateUrl: './header-right-sidebar.component.html',
    styleUrls: ['./header-right-sidebar.component.css']
})
export class HeaderRightSidebarComponent implements OnInit, OnDestroy {
    userId: number;
    heightSidebar: string; 
    isActiveLink: object;
    connectedSubscription: Subscription;
    eventComSubscription: Subscription;

    constructor(private authService: AuthenticationService,
        public global: GlobalService,
        public eventCom: EventCommunicationService,
        private router: Router) { }

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
            if (e.component === "L" && e.event === "click" && e.idDom === "a")
                this.unselectAll();
        });
    }

    ngOnDestroy(): void {
        if (this.connectedSubscription)
            this.connectedSubscription.unsubscribe();
        if (this.eventComSubscription)
            this.eventComSubscription.unsubscribe();
        console.log("header-right-sidebar.component: destroyed!");
    }

    private init() {
        this.userId = 0;
        if(this.authService.currentUserValue)
            this.userId = this.authService.currentUserValue.id;
        
        this.heightSidebar = "0";
        this.isActiveLink = {
            profile: true,
            logOut: false
        }
    }

    toggleSidebar(): void {
        if (this.heightSidebar === "0")
            this.heightSidebar = "64px";
        else
            this.heightSidebar = "0";
    }

    unselectAll(): void {
        for (const key in this.isActiveLink)
            this.isActiveLink[key] = false;
    }
    
    clickLink(event): void {
        this.eventCom.newEventSubject.next({
            component: "R",
            event: "click",
            idDom: "a"
        })
        this.unselectAll();
        this.isActiveLink[event.target.id] = true;
    }
    
    logOut(): void {
        this.authService.logOut();
        // Redirection vers la page de connexion
        this.router.navigate([`/${this.global.domainAppUrl}/log-in`]);
    }

}
