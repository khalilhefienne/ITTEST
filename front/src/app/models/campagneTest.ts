import { Platform } from "./platform";

export class CampagneTest {
    campagneId: number ;
  
    nom: string ;
    isActif: boolean;
    isPublic: boolean;
    platforme: Platform= new Platform(0,false,'',false) ;
    creatorId : number ;
    constructor(campagneId: number, nom: string,  isActif: boolean, isPublic: boolean,creatorId : number) {
      this.campagneId = campagneId;
      this.nom = nom;
      this.isActif = isActif;
      this.isPublic=isPublic;
      this.creatorId=creatorId
    
    }
    
    
     
    }
    