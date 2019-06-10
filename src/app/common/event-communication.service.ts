import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventCommunicationService {
    public newEventSubject: Subject<{component: string, event: string, idDom: string}>;

    constructor() { 
        this.newEventSubject = new Subject<{component: string, event: string, idDom: string}>();
    }
}
