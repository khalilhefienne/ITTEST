import { Component } from '@angular/core';
import { UtilisateurService } from './services/utilisateur/utilisateur.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  isLoggedIn!: boolean;

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
    if(localStorage.getItem('accessToken'))
   {this.isLoggedIn = true;}
   else
   this.isLoggedIn=false;
   
   
  }

  
 

}
