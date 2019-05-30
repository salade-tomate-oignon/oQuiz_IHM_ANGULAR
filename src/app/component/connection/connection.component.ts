import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../module/user/model/user';
import { UserService } from 'src/app/module/user/service/user.service';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/common/global.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit, OnDestroy {
    logInForm: FormGroup;
    pseudoCtrl: any;
    passwordCtrl: any;
    logInSubscription: Subscription;
    errorConnection: string;
    submitted: boolean;

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        public global: GlobalService,
        private router: Router) { }

    ngOnInit() {
        this.logInForm = this.formBuilder.group({
            pseudo: ["", [Validators.required, Validators.pattern(User.pseudoPattern)]],
            password: ["", [Validators.required, Validators.pattern(User.passwordPattern)]]
        });
        this.pseudoCtrl = this.logInForm.controls.pseudo;
        this.passwordCtrl = this.logInForm.controls.password;
        this. errorConnection = "";
        this. submitted = false;
        this.global = new GlobalService();
    }

    ngOnDestroy(): void {
        if (this.logInSubscription)
            this.logInSubscription.unsubscribe();
        console.log("connection.component: destroyed!");
    }

    onSubmit(): void {
        this.submitted = true;

        // Le formulaire est invalide
        if (this.logInForm.invalid) {
            return;
        }

        // Le formulaire est valide
        this.logInSubscription = this.userService.logIn(this.pseudoCtrl.value, this.passwordCtrl.value).subscribe(
            // Connexion OK
            user => {
                // TODO redirection vers l'espace utilisateur
                console.log(user);
                this.errorConnection = "";
                this.router.navigate([`${this.global.domainAppUrl}/accueil`]);
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
            }
        )
    }

}
