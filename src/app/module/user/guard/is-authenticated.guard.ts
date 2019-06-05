import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Service
import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
    constructor(private router: Router, 
        private authService: AuthenticationService,
        public global: GlobalService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        // Client non authentifié
        if (!this.authService.isAuthenticated()) {
            // Redirection vers la page de connexion
            this.router.navigate([`${this.global.domainAppUrl}/log-in`]);
        }

        return this.authService.isAuthenticated();
    }
  
}
