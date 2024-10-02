import { Permission } from "./permission";

export class Profil {
  profil_id: number;
  nom: string= '';
  description: string= '';
 
  constructor(profil_id: number, nom: string, description: string) {
    this.profil_id = profil_id;
    this.nom = nom;
    this.description = description;
  }

    
  
  }