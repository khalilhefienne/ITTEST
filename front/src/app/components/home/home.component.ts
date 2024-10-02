import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog,private monService: UtilisateurService,private toastr: ToastrService) { }
  imageUrl!: string;
  decryptedPassword: string=''; // Ajouter une variable pour le mot de passe décrypté


  file!: File ; // Déclarer et initialiser la variable avec null par défaut


  userConnecte: Utilisateur = new Utilisateur; // Déclarer la variable userConnecte de type User

  ngOnInit(): void {
  // Récupérer l'utilisateur connecté (ex: depuis le service AuthService)
  this.monService.getCurrentUser().subscribe(
    (utilisateur) => {
      this.userConnecte = utilisateur;
     

      this.monService.getImageUrl(this.userConnecte.image).subscribe(
        imageUrl => {
          this.imageUrl = imageUrl;
          // Autres opérations à effectuer avec l'URL de l'image
        })

     
    },
    (erreur) => {
      console.error('Erreur lors de la récupération de l\'utilisateur connecté', erreur);
    }
  );  



  }



  updateProfile(): void {
  
      this.monService.updateProfile(this.userConnecte, this.file).subscribe(
        
        updatedUtilisateur => {
          console.log('Utilisateur mis à jour:', updatedUtilisateur);
          // Ajoutez ici le code pour gérer la réponse de succès
          this.toastr.success('Utilisateur mis à jour avec succès');
           // Recharger la page
          window.location.reload();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
          // Ajoutez ici le code pour gérer l'erreur
          this.toastr.error('Erreur lors de la mise à jour de l\'utilisateur');
        }
      );
    
  }
  
  
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    } 
   
  }
  
  
}

