import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Module
import { UserModule } from './module/user/user.module';
import { GlobalService } from './common/global.service';
import { EventCommunicationService } from './common/event-communication.service';

// Component
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
        UserModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        GlobalService,
        EventCommunicationService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
