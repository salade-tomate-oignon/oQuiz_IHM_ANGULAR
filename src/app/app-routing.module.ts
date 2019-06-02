import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionComponent } from './component/inscription/inscription.component';
import { ConnectionComponent } from './component/connection/connection.component';
import { HomeComponent } from './component/home/home.component';
import { UserHomeComponent } from './component/user-home/user-home.component';

import { GlobalService } from './common/global.service';

import { IsAuthenticatedGuard } from './module/user/guard/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './module/user/guard/is-not-authenticated.guard';

const global = new GlobalService();
const routes: Routes = [
    {
        path: `${global.domainAppUrl}/accueil`,
        component: HomeComponent
    },
    {
        path: `${global.domainAppUrl}/inscription`,
        component: InscriptionComponent,
        canActivate: [
            IsNotAuthenticatedGuard
        ]
    },
    {
        path: `${global.domainAppUrl}/connexion`,
        component: ConnectionComponent,
        canActivate: [
            IsNotAuthenticatedGuard
        ]
    },
    {
        path: `${global.domainAppUrl}/user/:id/accueil`,
        component: UserHomeComponent,
        canActivate: [
            IsAuthenticatedGuard
        ]
    },
    {
        path: '**',
        redirectTo: `${global.domainAppUrl}/accueil`
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
