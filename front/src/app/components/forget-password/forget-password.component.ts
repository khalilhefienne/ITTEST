import { Component } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
 
  email!: string;
  newPassword!: string;

  constructor(private passwordResetService: UtilisateurService) { }
  onSubmitRequest() {
    this.passwordResetService.resetPassword(this.email)
      .subscribe(
        response => {
          console.log(response); // Affichez un message de succès à l'utilisateur
        },
        error => {
          console.log(error); // Affichez un message d'erreur à l'utilisateur
        }
      );
  }

  onSubmitReset() {
    this.passwordResetService.requestPasswordReset(this.email, this.newPassword)
      .subscribe(
        response => {
          console.log(response); // Affichez un message de succès à l'utilisateur
        },
        error => {
          console.log(error); // Affichez un message d'erreur à l'utilisateur
        }
      );
  }
}
