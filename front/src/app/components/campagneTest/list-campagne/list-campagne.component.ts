import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CampagneTest } from 'src/app/models/campagneTest';
import { CampagneTestService } from 'src/app/services/campagneTest/campagne-test.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { CasTestService } from 'src/app/services/casTest/cas-test.service';
import { Observable } from 'rxjs';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur';
import { Platform } from 'src/app/models/platform';

@Component({
  selector: 'app-list-campagne',
  templateUrl: './list-campagne.component.html',
  styleUrls: ['./list-campagne.component.css']
})
export class ListCampagneComponent implements OnInit,AfterViewInit {
  //ajout
  CampagneTestForm!: FormGroup;
  CampagneTestFormUpdate!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  isModalOpen = false;
  //sort
  columns = ['nom', 'isActif', 'isPublic']; // noms des colonnes
  sortColumn = 'nom'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  CampagneTestDetails: any;
  userConnecte: Utilisateur = new Utilisateur();
  utils: any[] = [];
 CampagneTestD!: CampagneTest;
 users: Utilisateur[] = [];

 platfroms: Platform[] = [];
 
  //
  CampagneTest!: CampagneTest[];
  CampagneTests!: CampagneTest[];
  //
  nomuser!: String;
//ajout

  constructor(private CampagneTestService: CampagneTestService, private formBuilder: FormBuilder,
  
    private router: Router,private toastr :ToastrService,private CasTestService: CasTestService, 
    private modalService: NgbModal,private UtilisateurService :UtilisateurService) {

      this.CampagneTestForm = this.formBuilder.group({
        nom: ['', Validators.required],
       
        isActif: [false, Validators.required],
        isPublic: [false, Validators.required],
        platformm: [''],
        creatorId: [null, Validators.required] // Set creatorId initially to null
      
      });
      this.CampagneTestFormUpdate = this.formBuilder.group({
        nom: ['', Validators.required],
       
        isActif: [false, Validators.required],
        isPublic: [false, Validators.required],
        platformm: [''],
   
       // creatorId: [null, Validators.required] // Set creatorId initially to null
      });
      
    
     }
  ngAfterViewInit(): void {
this.getUtilisateurs();
this.getPlatforms();
this.UtilisateurService.getUtilisateursList().subscribe(data => {
  this.utils = data;
});
  this.UtilisateurService.getCurrentUser().subscribe(
    (utilisateur) => {
      this.userConnecte = utilisateur;
      this.CampagneTestD.creatorId = this.userConnecte.id 
      this.nomuser=utilisateur.nom;
      this.CampagneTestForm.patchValue({ creatorId: this.userConnecte.id }); // Assign the user's ID to creatorId

      // Initialiser creator avec l'utilisateur connecté
    },
    (erreur) => {
      console.error('Erreur lors de la récupération de l\'utilisateur connecté', erreur);
    }
  );
  }
  getPlatforms() {
    this.CampagneTestService.getPlatformsList().subscribe(
      platfroms => {
        this.platfroms = platfroms;
      },
      error => {
        console.log('Erreur lors de la récupération des platfroms : ', error);
      }
    );
  }
  
  private getUtilisateurs(){
    this.UtilisateurService.getUtilisateursList().subscribe(
      data => {
        this.users = data;
       
      },
      error => { console.log(error); }
    );
  }
  ngOnInit(): void {
    this.CampagneTestD = new CampagneTest(0,'',false,false,0);
    this.loadUserAuthorities();
    this.getCampagneTests();
    this.getAllCampagneTests()
    this.onSortColumn(this.sortColumn);
   
 
  
  }
creatorId!:number;
prenom!:string;
private getAllCampagneTests(){
  this.UtilisateurService.getCurrentUser().subscribe(
    (utilisateur) => {
      this.userConnecte = utilisateur;
      this.CampagneTestD.creatorId = this.userConnecte.id 
      this.nomuser=utilisateur.nom;
      this.prenom=utilisateur.prenom;
      this.creatorId=utilisateur.id;
    
      this.CampagneTestService.getCampagneTestsList().subscribe(data => {
        this.CampagneTests = data;
        this.updateCaseCounts();
     
      });
      // Initialiser creator avec l'utilisateur connecté
    },
    (erreur) => {
      console.error('Erreur lors de la récupération de l\'utilisateur connecté', erreur);
     // console.log(this.creatorId)
    }
  );

 // console.log(this.creatorId)
}
  private getCampagneTests(){
    this.UtilisateurService.getCurrentUser().subscribe(
      (utilisateur) => {
        this.userConnecte = utilisateur;
        this.CampagneTestD.creatorId = this.userConnecte.id 
        this.nomuser=utilisateur.nom;
        this.prenom=utilisateur.prenom;
        this.creatorId=utilisateur.id;
      
        this.CampagneTestService.getCampagneTestsList().subscribe(data => {
          this.CampagneTest = data;
          console.log(this.creatorId)
        });
        // Initialiser creator avec l'utilisateur connecté
      },
      (erreur) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté', erreur);
       // console.log(this.creatorId)
      }
    );
  
   // console.log(this.creatorId)
  }
 
  
  onSortColumn(columnName: string) {
    if (columnName !== this.sortColumn) {
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
  
    this.CampagneTest.sort((a: any, b: any) => {
      let x, y;
  
   
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  
  /*
  SequenceTestDetails(id: number){
    this.router.navigate(['sequence-details', id]);
  }
*/
  

  deleteCampagneTest(id: number){
    this.CampagneTestService.deleteCampagneTest(id).subscribe( data => {
      console.log(data);

      this.getCampagneTests();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  isActif: boolean = false;
  isPublic: boolean = false;

  public searchCampagneTest(key: string): void {
    
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getCampagneTests();
      return;
    }
  
    const results: CampagneTest[] = [];
    for (const pg of this.CampagneTest) {

      if (
        pg.nom.toLowerCase().includes(key.toLowerCase()) ||
       
        pg.creatorId.toString().toLowerCase().includes(key.toLowerCase())||
        (this.isActif.toString().toLowerCase().includes(key.toLowerCase())) ||
        (this.isPublic.toString().toLowerCase().includes(key.toLowerCase())) 
        
      ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "CampagneTest");
    }
  
    // On remplace la liste de SequenceTest par les résultats de la recherche
    this.CampagneTest = results;
  }
  
 

  
  generatePDF(): void {
    this.CampagneTestService.getCampagneTestsList().subscribe((CampagneTests) => {
      this.CampagneTest = CampagneTests;
      const doc = new jsPDF();
      const columns = ['nom', 'description', 'prefixe', 'statut','isGestionnaireAnomalie','nomGestionnaire','User'];
      const rows = [];
  
      for (const event of this.CampagneTest) {
        rows.push([
          event.nom,
          event.isActif,
          event.isPublic,
      
          event.creatorId
        ]);
      }
  
      const rowsFormatted = rows.map(row => row.map(cell => String(cell)));
  
      autoTable(doc, {
        head: [columns],
        body: rowsFormatted
      });
  
      doc.save('CampagneTests.pdf');
    });
  }
  
/*name of the excel-file which will be downloaded. */ 
fileName= 'listesCampagneTests.xlsx';  

exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }

  //detail
  @ViewChild('modalDetails') modalDetails!: ElementRef;

  openDetails(CampagneTestId: number) {
    this.isModalOpen = true;
    this.CampagneTestService.getCampagneTestById(CampagneTestId).subscribe(data => {
      this.CampagneTestD = data;
      this.CampagneTestD.creatorId = this.userConnecte.id;
      // Ouvrir le modal
      this.modalService.open(this.modalDetails, { backdrop: false });
    });
    
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getCampagneTests();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.CampagneTestForm.controls;
  }
  //update
 //update
@ViewChild('modalUpdate') modalUpdate!: ElementRef;
selectedCampagneTestId: number = 0;

openUpdate(sequenceId: number) {
  this.isModalOpen = true;

  this.CampagneTestService.getCampagneTestById(sequenceId).subscribe(data => {
    this.selectedCampagneTestId = sequenceId;

    const selectedPlatform = this.platfroms.find(platform => platform.platform_id === data.platforme?.platform_id);

    this.CampagneTestFormUpdate.setValue({
      nom: data.nom,
      platformm: selectedPlatform,
      isActif: data.isActif || false,
      isPublic: data.isPublic || false,
    });

    // Ouvrir le modal
    this.modalService.open(this.modalUpdate, { backdrop: false });
  });
}

onSubmit() {
  const platformId = this.CampagneTestFormUpdate.value.platformm?.platform_id;
  const platform = this.platfroms.find(platform => platform.platform_id === platformId);

  const updatedCampagne = {
    ...this.CampagneTestFormUpdate.value,
    platforme: platform
  };

  this.CampagneTestService.updateCampagneTest(this.selectedCampagneTestId, updatedCampagne).subscribe(
    data => {
      console.log(data);
      this.toastr.success('Modification réussie !');
      this.getCampagneTests();
      this.closeModal();
    },
    error => {
      console.error(error);
      if (error.status === 403) {
        // Gérer l'erreur 403 ici et fournir un feedback approprié à l'utilisateur (par exemple, afficher un message d'erreur)
        this.toastr.error("Vous n'avez pas l'autorisation de modifier cette campagne.", "Erreur");
      } else {
        // Autres erreurs
        this.toastr.error("Une erreur s'est produite lors de la modification de la campagne.", "Erreur");
      }
    }
  );
}



//ajout
@ViewChild('modalAjout') modalAjout!: ElementRef;

selectedplatform: Platform = {} as Platform;

openAjout() {
  this.isModalOpen = true;
 
 // Ouvrir le modal
 this.modalService.open(this.modalAjout, { backdrop: false });

}
nouvelleCampagne: CampagneTest = new CampagneTest(0,'',true,false,0);

onSubmitAdd() {
  const platformId = this.CampagneTestForm.value.platformm.platform_id; // Get the platform_id from the selected platform
  const platform = this.platfroms.find(platform => platform.platform_id === platformId);

  // Copy the values from the form to the new CampagneTest
  this.nouvelleCampagne = {
    ...this.CampagneTestForm.value,
    platforme: platform
  };

  this.CampagneTestService.createCampagneTest(this.nouvelleCampagne).subscribe(
    response => {
      console.log(response); // Display the backend response
      this.toastr.success('Ajout réussi !'); // Show a success message
      this.getCampagneTests(); // Refresh the list of CampagneTests after adding a new one
      this.closeModal(); // Close the modal after successful addition
    },
    error => {
      console.log(JSON.stringify(this.CampagneTestForm.value));
      // Handle errors in case of failure
    }
  );
}


creerSequence(id: number){
  this.router.navigate(['sequences', id]);
}
userAuthorities: string[] = [];

loadUserAuthorities() {
  this.UtilisateurService.getUserAuthorities().subscribe(
    (authorities: string[]) => {
      this.userAuthorities = authorities;
    },
    (error) => {
      // Gérer les erreurs lors de la récupération des autorisations
    }
  );

}
caseCounts: number[] = [];
private updateCaseCounts() {
  this.caseCounts = []; // Réinitialiser le tableau des nombres de cas de test

  this.CampagneTest.forEach((campagne, index) => {
    this.getCaseCountByCampagne(campagne.campagneId).subscribe(count => {
      this.caseCounts[index] = count;
    });
  });
}



getCaseCountByCampagne(id: number): Observable<number> {
return this.CasTestService.getCaseCountByCampagne(id);
}
findUserById(userId: number): Utilisateur | undefined {
  return this.users.find(user => user.id === userId);
}



}