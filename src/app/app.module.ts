// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './module/user/user.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { ConnectionComponent } from './component/connection/connection.component';
import { UserHomeComponent } from './component/user-home/user-home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        InscriptionComponent,
        ConnectionComponent,
        UserHomeComponent
    ],
    imports: [
        AppRoutingModule,
        NgbModule,
        UserModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
