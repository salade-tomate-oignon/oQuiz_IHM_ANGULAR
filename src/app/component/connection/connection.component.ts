import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../../module/user/model/user';
import { GlobalService } from 'src/app/common/global.service';
import { AuthenticationService } from 'src/app/module/user/service/authentication.service';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit, OnDestroy {
    logInForm: FormGroup;
    logInSubscription: Subscription;
    errorConnection: string;
    submitted: boolean;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        public global: GlobalService,
        private router: Router) { }

    ngOnInit() {
        this.logInForm = this.formBuilder.group({
            pseudo: ["agantzZ", [Validators.required, Validators.pattern(User.pseudoPattern)]],
            password: ["password", [Validators.required, Validators.pattern(User.passwordPattern)]]
        });
        this.errorConnection = "";
        this.submitted = false;
        this.global = new GlobalService();
    }

    ngOnDestroy(): void {
        if (this.logInSubscription)
            this.logInSubscription.unsubscribe();
        console.log("connection.component: destroyed!");
    }

    public get ctrl() : any {
        return this.logInForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // Le formulaire est invalide
        if (this.logInForm.invalid) {
            return;
        }

        // Le formulaire est valide
        this.logInSubscription = this.authService
            .logIn(this.ctrl.pseudo.value, this.ctrl.password.value)
            .subscribe(
                // Connexion OK
                user => {
                    this.errorConnection = "";
                    
                    // Redirection vers l'espace utilisateur
                    this.router.navigate([`/${this.global.domainAppUrl}/user/${user.id}/accueil`]);
                },
                // Erreur connexion
                err => {
                    err.error.forEach(elm => {
                        switch (elm.codeError) {
                            case 1:
                                this.errorConnection = "Vérifiez le pseudo";
                                break;
                            case 2:
                                this.errorConnection = "Vérifiez le mot de passe";
                                break;
                            case 4:
                                this.errorConnection = "pseudo ou mot de passe erroné";
                                break;
                            default:
                                console.log("Le serveur a rencontré un problème")
                                break;
                        }                    
                    });
            });
    }

}
