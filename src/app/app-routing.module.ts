import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionComponent } from './component/inscription/inscription.component';
import { ConnectionComponent } from './component/connection/connection.component';
import { HomeComponent } from './component/home/home.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { GlobalService } from './common/global.service';

const global = new GlobalService();
const routes: Routes = [
    {
        path: `${global.domainAppUrl}/accueil`,
        component: HomeComponent
    },
    {
        path: `${global.domainAppUrl}/inscription`,
        component: InscriptionComponent
    },
    {
        path: `${global.domainAppUrl}/connexion`,
        component: ConnectionComponent
    },
    {
        path: `${global.domainAppUrl}/user/{id}/home`,
        component: UserHomeComponent
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
