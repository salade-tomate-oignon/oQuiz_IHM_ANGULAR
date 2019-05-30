import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
    // readonly baseAppUrl: string = 'http://localhost:3000/';
    readonly domainAppUrl: string = 'oQuiz';
    readonly apiUrl: string = "http://localhost:8080/oquiz/api/v0";
}