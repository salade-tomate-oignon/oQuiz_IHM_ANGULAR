import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { InscriptionComponent } from './component/inscription/inscription.component';
import { ConnectionComponent } from './component/connection/connection.component';
import { HomeComponent } from './component/home/home.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { UserProfilComponent } from './module/user/component/profil/profil.component';
import { UserRequestFriendComponent } from './module/user/component/request-friend/request-friend.component';
import { UserOnHoldComponent } from './module/user/component/on-hold/on-hold.component';
import { UserAllFriendsComponent } from './module/user/component/all-friends/all-friends.component';
import { UserBlockedUsersComponent } from './module/user/component/blocked-users/blocked-users.component';

// Service
import { GlobalService } from './common/global.service';

// Guard
import { IsAuthenticatedGuard } from './module/user/guard/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './module/user/guard/is-not-authenticated.guard';

const global = new GlobalService();
const routes: Routes = [
    {
        path: `${global.domainAppUrl}/home`,
        component: HomeComponent
    },
    {
        path: `${global.domainAppUrl}/sign-up`,
        component: InscriptionComponent,
        canActivate: [
            IsNotAuthenticatedGuard
        ]
    },
    {
        path: `${global.domainAppUrl}/log-in`,
        component: ConnectionComponent,
        canActivate: [
            IsNotAuthenticatedGuard
        ]
    },
    {
        path: `${global.domainAppUrl}/user/:id`,
        canActivate: [
            IsAuthenticatedGuard
        ],
        children: [ 
            {
                path: `home`,
                component: UserHomeComponent
            },
            {
                path: `profile`,
                component: UserProfilComponent
            },
            {
                path: `add-friend`,
                component: UserRequestFriendComponent
            },
            {
                path: `all-friends`,
                component: UserAllFriendsComponent
            },
            {
                path: `blocked-users`,
                component: UserBlockedUsersComponent
            },
            {
                path: `on-hold`,
                component: UserOnHoldComponent
            },
            {
                path: `discussions`,
                component: UserHomeComponent
            },
            {
                path: `gaming`,
                component: UserHomeComponent
            },
            {
                path: '**',
                redirectTo: `home`
            }
        ]
    },
    {
        path: '**',
        redirectTo: `${global.domainAppUrl}/home`
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
