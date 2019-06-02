import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from 'src/app/module/user/model/user';
import { GlobalService } from 'src/app/common/global.service';
import { UserService } from 'src/app/module/user/service/user.service';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit, OnDestroy {
    signUpForm: FormGroup;
    signUpSubscription: Subscription;
    errorSignUp: string;
    submitted: boolean;

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        public global: GlobalService) { }

    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            firstName: ["", [Validators.required, Validators.pattern(User.firstNamePattern)]],
            lastName: ["", [Validators.required, Validators.pattern(User.lastNamePattern)]],
            pseudo: ["", [Validators.required, Validators.pattern(User.pseudoPattern)]],
            email: ["", [Validators.required, Validators.pattern(User.emailPattern)]],
            password: ["", [Validators.required, Validators.pattern(User.passwordPattern)]]
        });
        this. errorSignUp = "";
        this. submitted = false;
        this.global = new GlobalService();
    }

    ngOnDestroy(): void {
        if (this.signUpSubscription)
            this.signUpSubscription.unsubscribe();
        console.log("inscription.component: destroyed!");
    }

    public get ctrl() : any {
        return this.signUpForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // Le formulaire est invalide
        if (this.signUpForm.invalid) {
            return;
        }

        // Le formulaire est valide
        let user = {
            firstName: this.ctrl.firstName.value,
            lastName: this.ctrl.lastName.value,
            pseudo: this.ctrl.pseudo.value,
            email: this.ctrl.email.value,
            password: this.ctrl.password.value
        };
        this.signUpSubscription = this.userService.signUp(user).subscribe(
            // inscription OK
            user => {
                // Redirection vers la page de connexion
                this.errorSignUp = "";
                this.router.navigate([`${this.global.domainAppUrl}/connexion`]);
            },
            // Erreur inscription
            err => {
                err.error.forEach(elm => {
                    switch (elm.codeError) {
                        case 1:
                            this.errorSignUp = "Vérifiez le prénom";
                            break;
                        case 2:
                            this.errorSignUp = "Vérifiez le nom";
                            break;
                        case 3:
                            this.errorSignUp = "Vérifiez le pseudo";
                            break;
                        case 4:
                            this.errorSignUp = "Vérifiez l'email";
                            break;
                        case 5:
                            this.errorSignUp = "Vérifiez le mot de passe";
                            break;
                        case 7:
                            this.errorSignUp = "Ce pseudo est déjà utilisé";
                            this.signUpForm.patchValue({
                                pseudo: ""
                            });                            
                            break;
                        case 8:
                            this.errorSignUp = "Cet email est déjà utilisé";
                            this.signUpForm.patchValue({
                                email: ""
                            });  
                            break;
                        default:
                            console.log("Le serveur a rencontré un problème")
                            break;
                    }                    
                });
            }
        )
    }

}
