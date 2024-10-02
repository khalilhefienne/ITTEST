  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { ProgressAnimationType, ToastrService } from 'ngx-toastr';
  import { Profil } from 'src/app/models/profil';
  import { Utilisateur } from 'src/app/models/utilisateur';
  import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

  @Component({
    selector: 'app-utilisateur',
    templateUrl: './utilisateur.component.html',
    styleUrls: ['./utilisateur.component.css']
  })

  export class UtilisateurComponent {
    
    utilisateur: Utilisateur = new Utilisateur(); // Créez une instance de l'utilisateur
    constructor(private utilisateurService: UtilisateurService,private toastr: ToastrService, private router: Router) {}
    toastRef: string | undefined;
    captchaText: string = 'ABCK';
    captchaInput: string = '';
    generateCaptcha(): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let captcha = '';
      for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return captcha;
    }
  
    refreshCaptcha(): void {
      this.captchaText = this.generateCaptcha();
      this.captchaInput = ''; // Réinitialiser la valeur de l'entrée utilisateur
    }
  
    onRegister(): void {
      // Vérifier le captcha
    if (this.captchaInput !== this.captchaText) {
      console.error('Captcha incorrect. Veuillez réessayer.');
      this.toastr.error('Captcha incorrect. Veuillez réessayer.');
      return;
    }

    // CAPTCHA résolu, continuer avec l'enregistrement de l'utilisateur
      this.utilisateur.statut = true;
      this.utilisateur.is_admin = false;
      this.utilisateur.date_creation
    
      this.utilisateurService.register(this.utilisateur).subscribe(
        response => {
          console.log('Utilisateur enregistré avec succès, veuillez verifiez votre boite de reception pour activer votre compte', response);
          this.toastr.success('Inscription réussie !');
          this.router.navigate(['/login']);
          // Gérer la réponse du serveur en conséquence
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur', error);
          this.toastr.error('Erreur inscription ', error.error.message);
      


          // Gérer l'erreur en conséquence
        }
      );

  }
  }
    
    
  
