import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component
import { UserHeaderComponent } from './component/header/header.component';
import { UserProfilComponent } from './component/profil/profil.component';
import { HeaderLeftSidebarComponent } from './component/header-left-sidebar/header-left-sidebar.component';
import { HeaderRightSidebarComponent } from './component/header-right-sidebar/header-right-sidebar.component';

// Service
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';

// Guard
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './guard/is-not-authenticated.guard';

// Interceptor
import { unauthenticatedInterceptor } from './interceptor/unauthenticated.interceptor';

@NgModule({
    declarations: [
        UserProfilComponent,
        UserHeaderComponent,
        HeaderLeftSidebarComponent,
        HeaderRightSidebarComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        UserProfilComponent,
        UserHeaderComponent
    ],
    providers: [
        AuthenticationService,
        IsAuthenticatedGuard,
        IsNotAuthenticatedGuard,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: unauthenticatedInterceptor, multi: true },
    ]
})
export class UserModule { }
