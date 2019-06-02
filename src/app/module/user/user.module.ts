// Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Service
import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';

import { IsAuthenticatedGuard } from './guard/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './guard/is-not-authenticated.guard';
import { unauthenticatedInterceptor } from './interceptor/unauthenticated.interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        GlobalService,
        AuthenticationService,
        IsAuthenticatedGuard,
        IsNotAuthenticatedGuard,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: unauthenticatedInterceptor, multi: true },
    ]
})
export class UserModule { }
