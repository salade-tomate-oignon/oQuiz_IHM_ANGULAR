import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/user';
import { GlobalService } from 'src/app/common/global.service';

@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private global: GlobalService, private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public logIn(pseudo: string, password: string): Observable<User> {
        return this.http.get<any>(`${this.global.apiUrl}/user/log-in/pseudo/${pseudo}/password/${password}`).pipe(
            // Formatage des données en <User>
            map(json => {
                let user = new User(json.id, json.firstName, json.lastName, json.pseudo, json.email);

                if (json) { 
                    this.openSession(user);
                    this.currentUserSubject.next(user);
                }
                
                return user;
            })
        );
    }

    public logOut(): void {
        this.closeSession();
        this.currentUserSubject.next(null);
    }

    public isAuthenticated(): boolean {
        return this.currentUserValue != null;
    }

    private openSession(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log("Session ouverte!");
    }

    private closeSession(): void {
        localStorage.clear();
        console.log("Session fermée!");
    }

}
