import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {
    
    constructor() { }
        
    ngOnInit() {
    }
        
    ngOnDestroy(): void {
        console.log("user-home.component: destroyed!");
    }

}
