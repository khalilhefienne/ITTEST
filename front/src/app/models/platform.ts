export class Platform {
    platform_id: number;
    platform: String;
    EnDesign: boolean;
    EnExecution: boolean;
   
    constructor(platform_id: number, EnDesign: boolean, platform: String, EnExecution: boolean) {
      this.platform_id = platform_id;
      this.EnDesign = EnDesign;
      this.EnExecution = EnExecution;
      this.platform=platform
    }
  
      
    
    }