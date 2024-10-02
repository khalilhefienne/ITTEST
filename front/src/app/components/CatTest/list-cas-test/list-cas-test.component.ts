import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CampagneTest } from 'src/app/models/campagneTest';
import { CasTest } from 'src/app/models/casTest';
import { SenarioTest } from 'src/app/models/senarioTest';
import { CampagneTestService } from 'src/app/services/campagneTest/campagne-test.service';
import { CasTestService } from 'src/app/services/casTest/cas-test.service';
import { SenarioTestService } from 'src/app/services/senarioTest/senario-test.service';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { MotsCle } from 'src/app/models/motsCle';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
@Component({
  selector: 'app-list-cas-test',
  templateUrl: './list-cas-test.component.html',
  styleUrls: ['./list-cas-test.component.css']
})
export class ListCasTestComponent  implements OnInit,AfterViewInit {
  //ajout
  casTestForm!: FormGroup;
  //update
  casTestFormUpdate!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  //sort
  columns = ['titre', 'preconditions',  'statut','duree_estime']; // noms des colonnes
  sortColumn = 'titre'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  casTestDetails: any;
 
  CasTestD!: CasTest;
  //
  CasTest!: CasTest[];
  //cle
  campagneTest!: CampagneTest;
  campagneTests: CampagneTest[] = [];
  senarioTest!: SenarioTest;
  senarioTests: SenarioTest[] = [];
  //mots


  isModalOpen = false;
//ajout

  constructor(private CasTestService: CasTestService,private SenarioTestService: SenarioTestService,private UtilisateurService : UtilisateurService,
    private CampagneTestService:CampagneTestService, private formBuilder: FormBuilder,private route: ActivatedRoute
,
    private router: Router,private toastr :ToastrService,private modalService: NgbModal) {
      this.casTestForm = this.formBuilder.group({
       
        titre: new FormControl('', Validators.required),
        preconditions: new FormControl('', Validators.required),
        statut: new FormControl(false, Validators.required),
        
        duree_estime: new FormControl('', Validators.required),
       // senarioId: new FormControl('', Validators.required),
    
        campagneId: new FormControl('', Validators.required)
      });
      this.casTestFormUpdate = this.formBuilder.group({
       
        titre: new FormControl('', Validators.required),
        preconditions: new FormControl('', Validators.required),
        statut: new FormControl(false, Validators.required),
        
        duree_estime: new FormControl('', Validators.required),
        senarioId: new FormControl(''),
    
        campagneId: new FormControl('', Validators.required)
      });
     }
  ngAfterViewInit(): void {
    this.CampagneTestService.getCampagneTestsList().subscribe(data => {
      this.campagneTests = data;
    });
 //update
this.SenarioTestService.getSenarioTestList().subscribe(data => {
  this.senarioTests = data;
});
this.SenarioTestService.getSenarioTestById(this.route.snapshot.params['senarioId']).subscribe(
  senario => {
    this.senarioTest = senario; });


  }
nomsenariocurrent!:String;
  ngOnInit(): void {
 this.loadUserAuthorities();
    this.getCasTests();
    this.onSortColumn(this.sortColumn);
  
    this.SenarioTestService.getSenarioTestList().subscribe(data => {
      this.senarioTests = data;
    

    });
    this.CampagneTestService.getCampagneTestsList().subscribe(data => {
      this.campagneTests = data;
    });
    
  
  
  
  }

  private getCasTests(){
    this.CasTestService.getCasTestsBySenarioId(this.route.snapshot.params['senarioId']).subscribe(
      data => {
        this.CasTest = data;
        for (let seq of this.CasTest) {
          this.SenarioTestService.getSenarioTestById(seq.senarioId).subscribe(
            senario => { this.senarioTests[seq.senarioId] = senario; },
            error => { console.log(error); }
          );
         
            
          this.CampagneTestService.getCampagneTestById(seq.campagneId).subscribe(
            campagne => { this.campagneTests[seq.campagneId] = campagne; },
            error => { console.log(error); }
          );
        }
      },
      error => { console.log(error); }
    );
  }
  onSortColumn(columnName: string) {
    if (columnName !== this.sortColumn) {
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
  
    this.CasTest.sort((a: any, b: any) => {
      let x, y;
  
   
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  
 
  deleteCasTest(id: number){
    this.CasTestService.deleteCasTest(id).subscribe( data => {
      console.log(data);

      this.getCasTests();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchCasTest(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getCasTests();
      return;
    }
  
    const results: CasTest[] = [];
    for (const pg of this.CasTest) {
     
      if (pg.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || pg.preconditions.toLowerCase().indexOf(key.toLowerCase()) !== -1
  
      || pg.statut.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      
      || pg.duree_estime.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || this.senarioTests[pg.senarioId]?.nom?.toLowerCase()?.indexOf(key.toLowerCase()) !== -1
        || this.campagneTests[pg.campagneId]?.nom?.toLowerCase()?.indexOf(key.toLowerCase()) !== -1
        || pg.mots.some(mot => mot.mot.toLowerCase().indexOf(key.toLowerCase()) !== -1)
       ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Sequence Test");
    }
  
    // On remplace la liste de CasTest par les résultats de la recherche
    this.CasTest = results;
  }
  

  fileNamepdf= 'listeCasTests.pdf';  
  generatePDF(): void {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
  
    /* Create jsPDF instance */
    const doc = new jsPDF();
  
    /* Convert HTML table to PDF */
    (doc as any).autoTable({ html: element });  
    /* Save the PDF file */
    doc.save(this.fileNamepdf);
  }
  
/*name of the excel-file which will be downloaded. */ 
fileName= 'listeCasTests.xlsx';  

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


  openDetails(casTestId: number) {
    this.isModalOpen = true;
    // Récupérer les détails de la séquence de test
    this.CasTestD = new CasTest(
   
    );
    
    this.CasTestService.getCasTestById(casTestId).subscribe(data => {
      this.CasTestD = data;
  
      this.SenarioTestService.getSenarioTestById(this.CasTestD.senarioId).subscribe(proj => {
        this.senarioTest = proj;
        
        this.CampagneTestService.getCampagneTestById(this.CasTestD.campagneId).subscribe(camp => {
          this.campagneTest = camp;
        
            
          
          // Ouvrir le modal
          this.modalService.open(this.modalDetails, { backdrop: false });
        });
      });
    });
  }
  
  
  closeModal() {
    this.modalService.dismissAll();
    this.getCasTests();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.casTestForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedcasTestId: number =1;
  
  openUpdate(casTestId: number) {
   
    this.isModalOpen = true;
  
  
    this.CasTestService.getCasTestById(casTestId).subscribe(data => {
      this.selectedcasTestId = casTestId;
      this.casTestFormUpdate.setValue({
      
        titre: data.titre,
  preconditions: data.preconditions,
  statut: data.statut,
 
  duree_estime: data.duree_estime,
  senarioId: data.senarioId,
 // mots: data.mots,
  campagneId: data.campagneId
       
});
   // Ouvrir le modal
   this.modalService.open(this.modalUpdate, { backdrop: false });
});
}
onSubmit() {

    
 
  this.CasTestService.updateCasTest(this.selectedcasTestId, this.casTestFormUpdate.value).subscribe(data => {
    console.log(data);
    this.toastr.success('Modification réussie !');
  
   
  });
}
//ajout
@ViewChild('modalAjout') modalAjout!: ElementRef;


openAjout() {

  this.isModalOpen = true;  

 // Ouvrir le modal
 this.modalService.open(this.modalAjout, { backdrop: false });

}
creerEtape(id: number){
  this.router.navigate(['etapes', id]);
}


onSubmitAdd() {
  this.CasTestService.addCasTest(this.casTestForm.value, this.route.snapshot.params['senarioId'])
    .subscribe(
      (data: CasTest) => {
        console.log('Nouvelle CasTest ajoutée :', data);
        this.toastr.success('Nouvelle CasTest ajoutée');
        // Utilisez la nouvelle séquence comme vous le souhaitez...
      },
      (error) => {
        console.error("Une erreur s'est produite lors de l'ajout de la CasTest.", error);
        this.toastr.error("Une erreur s'est produite lors de l'ajout de la CasTest.");
        // Gérez l'erreur ou affichez un message d'erreur approprié à l'utilisateur
      }
    );
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

  }