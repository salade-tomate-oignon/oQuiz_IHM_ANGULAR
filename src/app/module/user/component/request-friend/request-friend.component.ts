import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Class
import { User } from '../../model/user';

// Service
import { AuthenticationService } from '../../service/authentication.service';
import { FriendService } from '../../service/friend.service';

@Component({
    selector: 'user-request-friend',
    templateUrl: './request-friend.component.html',
    styleUrls: ['./request-friend.component.css']
})
export class UserRequestFriendComponent implements OnInit {
    userId: number;
    addFriendForm: FormGroup;
    errorAddfriend: string;
    successAddFriend: boolean;
    
    constructor(private formBuilder: FormBuilder, 
        private authService: AuthenticationService,
        private userService: FriendService) { }

    ngOnInit() {
        this.init();
        this.addFriendForm = this.formBuilder.group({
            pseudo: ["", [Validators.required, Validators.pattern(User.pseudoPattern)]]
        });
    }

    private init() {
        this.userId = this.authService.currentUserValue.id;
        this.errorAddfriend = "";
        this.successAddFriend = false;
    }

    public get ctrl() : any {
        return this.addFriendForm.controls;
    }

    reset(): void {
        this.init();
        this.addFriendForm.setValue({
            pseudo: ""
        });
    }

    onSubmit(): void {
        // Le formulaire est invalide
        if (this.addFriendForm.invalid) {
            this.errorAddfriend = "";
            return;
        }
        
        // Requête adressée à l'API REST
        if(this.ctrl.pseudo.value === "tomtom")
            console.log(this.ctrl.pseudo.value);
        
        this.userService.friendRequest(this.userId, this.ctrl.pseudo.value)
            .then(
                // Modification du profil réussie
                resp => {
                    // Mise-à-jour de l'affichage
                    this.reset();
                    this.successAddFriend = true;
                    
                    setTimeout(() => {
                        this.successAddFriend = false;
                    }, 4000);
                })
            .catch(
                // Erreur inscription
                err => {
                    if (Array.isArray(err.error)) {
                        err.error.forEach(elm => {
                            switch (elm.codeError) {
                                case 1:
                                    this.errorAddfriend = "Ce pseudo n'existe pas";
                                    break;
                                case 2:
                                    this.errorAddfriend = "Action interdite";
                                    break;
                                case 3:
                                    this.errorAddfriend = "Vous êtes déjà amis";                          
                                    break;
                                case 5:
                                    this.errorAddfriend = "Vous avez été bloqué";
                                    break;
                                default:
                                    console.log("Le serveur a rencontré un problème")
                                    break;
                            }                    
                        });
                    }
                }
            );
    }

}
