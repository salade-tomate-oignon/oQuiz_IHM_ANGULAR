import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from 'src/app/module/user/service/authentication.service';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {
    
    constructor(private authService: AuthenticationService,
        public global: GlobalService,
        private router: Router) { }
        
    ngOnInit() {
        console.log(JSON.parse(localStorage.getItem("currentUser")));
    }
        
    ngOnDestroy(): void {
        console.log("user-home.component: destroyed!");
    }

    logOut($event, item): void {
        this.authService.logOut();
        // Redirection vers la page de connexion
        this.router.navigate([`/${this.global.domainAppUrl}/connexion`]);
    }

}
