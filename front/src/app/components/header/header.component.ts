import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userConnecte: Utilisateur = new Utilisateur; // Déclarer la variable userConnecte de type User

  constructor(private monService: UtilisateurService) {}

 
  
   
  
  
    ngOnInit() {
      // Récupérer l'utilisateur connecté (ex: depuis le service AuthService)
      this.monService.getCurrentUser().subscribe(
        (utilisateur) => {
          this.userConnecte = utilisateur;
         
        },
        (erreur) => {
          console.error('Erreur lors de la récupération de l\'utilisateur connecté', erreur);
        }
      );
    }
    
   onLogout() {
    this.monService.logout();
    
  }
  
  
  
}
