import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Service
import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';

// Class
import { User } from '../../model/user';

@Component({
    selector: 'user-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class UserProfilComponent implements OnInit {
    user: User;
    profileForm: FormGroup;
    errorProfile: string;
    successProfile: boolean;
    isModifying: boolean;

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        public global: GlobalService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.init();
        this.profileForm = this.formBuilder.group({
            firstName: [{value: "", disabled: true}, [Validators.pattern(User.firstNamePattern)]],
            lastName: [{value: "", disabled: true}, [Validators.pattern(User.lastNamePattern)]],
            pseudo: [{value: "", disabled: true}, [Validators.pattern(User.pseudoPattern)]],
            email: [{value: "", disabled: true}, [Validators.pattern(User.emailPattern)]],
            password: [{value: "", disabled: true}, [Validators.pattern(User.passwordPattern)]]
        });
    }

    private init() {
        this.user = this.authService.currentUserValue;
        this.errorProfile = "";
        this.successProfile = false;
        this.isModifying = false;
    }

    public get ctrl() : any {
        return this.profileForm.controls;
    }

    modify(): void {
        this.isModifying = true;
        this.profileForm.enable();
    }
    
    reset(): void {
        this.init();
        this.profileForm.reset();
        this.profileForm.disable();
    }

    onSubmit(): void {
        // Le formulaire est vide
        if (!this.ctrl.firstName.value && !this.ctrl.lastName.value && !this.ctrl.pseudo.value
            && !this.ctrl.email.value && !this.ctrl.password.value) {
                this.errorProfile = "Veuillez renseigner au moins un champ";
                return;
            }
            
        // Le formulaire est invalide
        if (this.profileForm.invalid || this.profileForm.disabled) {
            this.errorProfile = "";
            return;
        }
        
        // Le formulaire est valide
        let data = {
            id: this.user.id,
            firstName: (this.ctrl.firstName.value)?this.ctrl.firstName.value:this.user.firstName,
            lastName: (this.ctrl.lastName.value)?this.ctrl.lastName.value:this.user.lastName,
            pseudo: (this.ctrl.pseudo.value)?this.ctrl.pseudo.value:this.user.pseudo,
            email: (this.ctrl.email.value)?this.ctrl.email.value:this.user.email,
            password: (this.ctrl.password.value)?this.ctrl.password.value:""
        };

        // Requête adressée à l'API REST
        this.userService.update(data, this.user.id)
            .then(
                // Modification du profil réussie
                resp => {
                    let user = new User(data.id, data.firstName, data.lastName, data.pseudo, data.email);
                    
                    // Mise-à-jour de la session 
                    this.authService.updateSession(user);
                    
                    // Mise-à-jour de l'affichage
                    this.profileForm.disable();
                    setTimeout(() => {
                        this.reset();
                        this.successProfile = true;
                    }, 200);
                    
                    setTimeout(() => {
                        this.successProfile = false;
                    }, 4000);
                })
            .catch(
                // Erreur inscription
                err => {
                    if (Array.isArray(err.error)) {
                        err.error.forEach(elm => {
                            switch (elm.codeError) {
                                case 2:
                                    this.errorProfile = "Manque d'information ou information incorrecte";
                                    break;
                                case 4:
                                    this.errorProfile = "Ce pseudo est déjà utilisé";                          
                                    break;
                                case 5:
                                    this.errorProfile = "Cet email est déjà utilisé";
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
