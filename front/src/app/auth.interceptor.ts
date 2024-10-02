import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

import { UtilisateurService } from './services/utilisateur/utilisateur.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: UtilisateurService , private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   /// const accessToken = this.authService.getAccessToken();
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      // Si un token d'accès est disponible, ajoutez-le à l'en-tête d'autorisation de la requête
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(request).pipe(tap(()=>{},(err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status!==403){
          return;
        }
        localStorage.clear();
        this.router.navigate(['/login']);
      }
      
    }));
  }
}
