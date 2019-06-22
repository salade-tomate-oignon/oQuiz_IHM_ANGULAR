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
    
    getAllfriendRequests(userId: number) {
        return this.http.get<any>(`${this.global.apiUrl}/friend/user/${userId}/getAllfriendRequests`).toPromise();
    }
    
    getAllBlockedfriends(userId: number) {
        return this.http.get<any>(`${this.global.apiUrl}/friend/user/${userId}/getAllBlockedfriends`).toPromise();
    }
    
    getAllfriends(userId: number) {
        return this.http.get<any>(`${this.global.apiUrl}/friend/user/${userId}/getAllfriends`).toPromise();
    }
    
    declineFriendRequest(userId: number, otherUserId: number) {
        return this.http.put<any>(`${this.global.apiUrl}/friend/user/${userId}/declineFriendRequest/otherUser/${otherUserId}`, []).toPromise();
    }
    
    blockUser(userId: number, otherUserId: number) {
        return this.http.put<any>(`${this.global.apiUrl}/friend/user/${userId}/blockUser/otherUser/${otherUserId}`, []).toPromise();
    }
    
    unBlockUser(userId: number, otherUserId: number) {
        return this.http.delete<any>(`${this.global.apiUrl}/friend/user/${userId}/unBlockUser/otherUser/${otherUserId}`).toPromise();
    }
    
    removeFriend(userId: number, otherUserId: number) {
        return this.http.delete<any>(`${this.global.apiUrl}/friend/user/${userId}/removeFriend/otherUser/${otherUserId}`).toPromise();
    }
    
    acceptFriendRequest(userId: number, otherUserId: number) {
        return this.http.put<any>(`${this.global.apiUrl}/friend/user/${userId}/acceptFriendRequest/otherUser/${otherUserId}`, []).toPromise();
    }
}
