import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Service
import { AuthenticationService } from '../../service/authentication.service';

// Component
import { HeaderLeftSidebarComponent } from '../header-left-sidebar/header-left-sidebar.component';
import { HeaderRightSidebarComponent } from '../header-right-sidebar/header-right-sidebar.component';

@Component({
    selector: 'user-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class UserHeaderComponent implements OnInit, OnDestroy {
    isHidden: boolean;
    connectedSubscription: Subscription;

    @ViewChild('leftSidebarComponent') leftSidebarComponent: HeaderLeftSidebarComponent; 
    @ViewChild('rightSidebarComponent') rightSidebarComponent: HeaderRightSidebarComponent; 

    constructor(private authService: AuthenticationService) { }

    ngOnInit() {
        if(this.authService.isAuthenticated())
            this.isHidden = false;
        else
            this.isHidden = true;

        this.connectedSubscription = this.authService.connected.subscribe(isConnected => {
            this.isHidden = !isConnected;
        });
    }

    ngOnDestroy(): void {
        if (this.connectedSubscription)
            this.connectedSubscription.unsubscribe();
        console.log("user-header.component: destroyed!");
    }

    selectItemLeftSidebar(): void {
        
    }

}
