import { User } from '../model/user';
import { Observable } from 'rxjs';

export interface UserInterface {

    logIn(pseudo: string, password: string): Observable<User>;
    
    signUp(user: object): Observable<any>;
}
