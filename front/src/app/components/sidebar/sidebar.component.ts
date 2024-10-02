import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  title = 'front';


  constructor(private authService: UtilisateurService) {
   
  }
  userAuthorities: string[] = [];

  loadUserAuthorities() {
    this.authService.getUserAuthorities().subscribe(
      (authorities: string[]) => {
        this.userAuthorities = authorities;
      },
      (error) => {
        // Gérer les erreurs lors de la récupération des autorisations
      }
    );
  }

  ngOnInit() {
    this.loadUserAuthorities();
   
   
  }
 
}