import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Service
import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {
    constructor(private router: Router, 
        private authService: AuthenticationService,
        public global: GlobalService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        // Client authentifié
        if (this.authService.isAuthenticated()) {
            let user = this.authService.currentUserValue;
            // Redirection vers l'espace utilisateur'
            this.router.navigate([`/${this.global.domainAppUrl}/user/${user.id}/home`]);
        }

        return !this.authService.isAuthenticated();
    }
  
}
