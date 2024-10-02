import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Assurez-vous de bien initialiser les propriétés avec une valeur par défaut
  password: string = ''; 

  constructor(private loginService: UtilisateurService,private router: Router,
    private toastr: ToastrService) { }

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe(
      response => {

        console.log(response);
        
        // Récupérez les tokens de la réponse
        const refreshToken = response['refresh-token'];
        const accessToken = response['access-token'];
        // Utilisez les tokens comme nécessaire dans votre application
         // Stockez les tokens dans votre service d'authentification
      this.loginService.storeTokens(accessToken, refreshToken);
        console.log('Refresh Token:', refreshToken);
        console.log('Access Token:', accessToken);
        this.router.navigate(['/home']);
        this.toastr.info('Logged in!');
       
       
      },
      error => {
        // Gérez les erreurs de la requête
        console.error('Erreur de connexion:');
        this.toastr.error('Erreur de connexion : Vérifiez que vous avez correctement saisi vos données ou que vous n\'avez pas encore activé votre compte');
      }
    );
  }
 
}
