import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class unauthenticatedInterceptor implements HttpInterceptor {
    constructor(public global: GlobalService, 
        private authService: AuthenticationService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(catchError(err => {
            // Non authentifié
            if (err.status === 401) {
                console.log("Non authentifié!!!");

                this.authService.logOut();
                // Redirection vers la page de connexion
                this.router.navigate([`/${this.global.domainAppUrl}/connexion`]);
            }

            // Session expirée
            if (err.status === 419 || err.status === 440) {
                console.log("Session expirée!!!");

                this.authService.logOut();
                // Redirection vers la page de connexion
                this.router.navigate([`/${this.global.domainAppUrl}/connexion`]);
            }
            
            return throwError(err);
        }))
    }
}