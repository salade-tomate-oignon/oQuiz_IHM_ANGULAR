import { Observable } from 'rxjs';

import { User } from '../model/user';

export interface UserInterface {

    logIn(pseudo: string, password: string): Observable<User>;
    
    signUp(user: object): Observable<any>;

    update(user: object, id: number);
}
