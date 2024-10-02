export class MotsCle {
    mot_id: number ;

    mot: string ;
    description: string ;
    constructor(mot_id: number, mot: string, description: string) {
      this.mot_id = mot_id;
      this.mot = mot;
      this.description = description;
    }
  }