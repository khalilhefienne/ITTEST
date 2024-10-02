import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
 
  private apiUrl = "http://localhost:8088/ADMINISTRATION";  private accessToken: string = ''; 
  private refreshToken: string = ''; 
  

  constructor(private http: HttpClient,private router: Router) {
    
  }

  isLoggedIn(): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    return of(accessToken !== null);
  }
  private currentUser: any;
  private jwtHelper = new JwtHelperService();



  getCurrentUser(): Observable<any> {
    // Récupération du token d'authentification stocké dans le local storage
    const token = localStorage.getItem('accessToken');
    // Vérification que le token existe et n'est pas expiré
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      // Décodage du token JWT pour obtenir l'identifiant de l'utilisateur
      const decodedToken = this.jwtHelper.decodeToken(token);
      const username = decodedToken.sub;
      // Récupération de l'utilisateur à partir de son identifiant grâce à une requête HTTP GET
      return this.getUtilisateurByUsername(username);
    } else {
      // Si le token est inexistant ou expiré, on retourne null pour indiquer que l'utilisateur n'est pas connecté
      return EMPTY;
    }
  }
  
  register(utilisateur: Utilisateur): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    // Ajouter un identifiant unique à l'utilisateur avant l'enregistrement
    utilisateur.id = 0; // Assurez-vous que l'identifiant est null ou vide
    
    return this.http.post(`${this.apiUrl}/register`, utilisateur, httpOptions);
  }
  
  
  getImageUrl(imageName: string): Observable<string> {
    const url = `${this.apiUrl}/images/${imageName}`;
    return this.http.get(url, { responseType: 'text' });
  }
  
  
  
  login(username: string, password: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(`${this.apiUrl}/login`, { username: username, password: password }, httpOptions);
  }
 

  storeTokens(accessToken: string, refreshToken: string): void {
    // Stockez les tokens dans les variables privées de la classe
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    // Vous pouvez également stocker les tokens dans le stockage local (localStorage) ou dans un cookie pour les persister entre les sessions
    // Exemple d'utilisation de localStorage :
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string {
    // Retourne le token d'accès stocké
    return this.accessToken;
    // Si vous avez stocké les tokens dans le localStorage, vous pouvez les récupérer comme ceci :
    // return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string {
    // Retourne le token de rafraîchissement stocké
    return this.refreshToken;
    // Si vous avez stocké les tokens dans le localStorage, vous pouvez les récupérer comme ceci :
    // return localStorage.getItem('refreshToken');
  }

  logout(): void {
    // Supprimer les tokens du stockage local
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  
   
  }
 
  getUtilisateurByUsername(username: string): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.apiUrl}/retrieveByUsername/${username}`);
  }

 

  updateProfile(utilisateur: Utilisateur, file: File): Observable<Utilisateur> {
    const formData: FormData = new FormData();
    formData.append('utilisateur', JSON.stringify(utilisateur));
    if (file) {
      formData.append('image', file, file.name);
    }  

    return this.http.put<Utilisateur>(`${this.apiUrl}/modify-User`, formData);
  }

  // Méthode pour récupérer les autorisations de l'utilisateur connecté à partir du jeton JWT
  getUserAuthorities(): Observable<string[]> {
    // Récupération du token d'authentification stocké dans le local storage
    const token = localStorage.getItem('accessToken');

    // Vérification que le token existe et n'est pas expiré
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      // Décodage du token JWT pour obtenir les informations nécessaires
      const decodedToken = this.jwtHelper.decodeToken(token);
      // Les autorisations peuvent être stockées dans une propriété spécifique du jeton, par exemple 'profils'
      const authorities = decodedToken.profils || [];
      return of(authorities);
    } else {
      // Si le token est inexistant ou expiré, on retourne EMPTY pour indiquer que l'utilisateur n'est pas connecté
      return EMPTY;
    }
  }

  
  getUtilisateursList(): Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/retrieve-all-Utilisateur`);
  }

  createUtilisateur(fct: Utilisateur): Observable<Object>{
    return this.http.post(`${this.apiUrl}/add-Utilisateur`, fct);
  }


  getUtilisateurById(id: number): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.apiUrl}/retrieve-Utilisateur/${id}`);
  }
  

  updateUtilisateur(id: number, fct: Utilisateur): Observable<Object>{
    return this.http.put(`${this.apiUrl}/modify-Utilisateur/${id}`, fct);
  }
 
  deleteUtilisateur(id: number): Observable<Object>{
    return this.http.delete(`${this.apiUrl}/remove-Utilisateur/${id}`);
  }
 
  requestPasswordReset(email: string, newPassword: string) {
    return this.http.put(`/reset?email=${email}`, newPassword);
  }
 
  resetPassword(email: string) {
    const params = new HttpParams().set('email', String(email));
    return this.http.post(`${this.apiUrl}/forgot-password`, null, { params: params });
  }
  
  
}
