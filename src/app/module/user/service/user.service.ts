import { Injectable } from '@angular/core';
import { UserInterface } from './user.interface';
import { User } from '../model/user';
import { GlobalService } from 'src/app/common/global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService implements UserInterface {
    constructor(private global: GlobalService,
        private http: HttpClient) { }
    

    logIn(pseudo: string, password: string): Observable<User> {
        return this.http.get<any>(`${this.global.apiUrl}/user/log-in/pseudo/${pseudo}/password/${password}`).pipe(
            // Formatage des données en <User>
            map(json => new User(json.id, json.firstName, json.lastName, json.pseudo, json.email))
        );
    }
    
    signUp(user: object): Observable<any> {
        return this.http.post<any>(`${this.global.apiUrl}/user/sign-up`, user);
    }

}
