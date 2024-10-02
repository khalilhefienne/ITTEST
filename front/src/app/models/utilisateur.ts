import { Profil } from "./profil";


export class Utilisateur {
  id : number =1 ;
  username: string = ''; 
  image:any;
  password: string = ''; 
  email: string = ''; 
  nom: string = ''; 
  prenom: string = ''; 
  profil : Profil = new Profil(1, '', '');
  statut: boolean = true;
  is_admin: boolean = true;
  date_creation: Date = new Date();




}