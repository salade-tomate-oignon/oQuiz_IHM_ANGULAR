import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Service
import { GlobalService } from 'src/app/common/global.service';

@Injectable()
export class FriendService {

    constructor(private global: GlobalService,
        private http: HttpClient) { }

    friendRequest(userId: number, pseudoFriend: string) {
        return this.http.post<any>(`${this.global.apiUrl}/friend/user/${userId}/friend-request/friend/${pseudoFriend}`, []).toPromise();
    }
}
