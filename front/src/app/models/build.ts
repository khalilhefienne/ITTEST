import { CampagneTest } from "./campagneTest";

export class Build {
    build_id: number = 1;
    titre: string= '';
    isActif: boolean;
    description: string= '';
    date_livraison: Date= new Date();
    campagneTest: CampagneTest= new CampagneTest(1,'',false,false,0) ;
    constructor(isActif: boolean) {
      
        this.isActif = isActif;
      
      }
    
  }