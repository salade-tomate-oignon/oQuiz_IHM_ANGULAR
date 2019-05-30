// Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Service
import { GlobalService } from 'src/app/common/global.service';
import { UserService } from './service/user.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        GlobalService,
        UserService
    ]
})
export class UserModule { }
