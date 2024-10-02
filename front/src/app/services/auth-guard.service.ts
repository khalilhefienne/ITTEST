import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UtilisateurService } from './utilisateur/utilisateur.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: UtilisateurService, private router: Router) {}
  

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }}