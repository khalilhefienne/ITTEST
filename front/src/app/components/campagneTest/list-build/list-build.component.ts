import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Build } from 'src/app/models/build';
import { CampagneTest } from 'src/app/models/campagneTest';
import { CampagneTestService } from 'src/app/services/campagneTest/campagne-test.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
@Component({
  selector: 'app-list-build',
  templateUrl: './list-build.component.html',
  styleUrls: ['./list-build.component.css']
})
export class ListBuildComponent implements OnInit,AfterViewInit {
  //ajout
  buildForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  //sort
  
  columns = [ 'titre', 'description', 'isActif','date_livraison','campagneTest']; // noms des colonnes
  sortColumn = 'titre'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  buildDetails: any;

  BuildD!: Build;
  //
  Build!: Build[];
  campagneTests: CampagneTest[] = [];

//ajout

  constructor(private campagneTestService: CampagneTestService, private formBuilder: FormBuilder,
  private toastr :ToastrService,private modalService: NgbModal,private UtilisateurService : UtilisateurService) {
 

  
    this.buildForm = this.formBuilder.group({
      titre: ['', Validators.required],
      isActif: [false], // Définissez la valeur par défaut ici
      description: ['', Validators.required],
      date_livraison: [new Date(), Validators.required],
      campagneTestt: [''],

    });
    
    
     }

  ngOnInit(): void {
    this.loadUserAuthorities();
    this.getBuilds();
      this.onSortColumn(this.sortColumn);
  


  
  }
  ngAfterViewInit():void{

    this.getcampagneTests();

    
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
// Appel à l'API ou à un service pour récupérer la liste des campagneTests depuis le backend
getcampagneTests() {
  this.campagneTestService.getCampagneTestsList().subscribe(
    campagneTests => {
      console.log(campagneTests); // Vérifier les valeurs récupérées depuis le backend
      this.campagneTests = campagneTests;
    },
    error => {
      console.log('Erreur lors de la récupération des campagneTests : ', error);
    }
  );
}


  private getBuilds(){
    this.campagneTestService.getBuildsList().subscribe(
      data => {
        this.Build = data;
     
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
  
    this.Build.sort((a: any, b: any) => {
      let x, y;
  
    
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  

  deleteBuild(id: number){
    this.campagneTestService.deleteBuild(id).subscribe( data => {
      console.log(data);

      this.getBuilds();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchBuild(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getBuilds();
      return;
    }
  
    const results: Build[] = [];
    for (const pg of this.Build) {
    
      if (
         pg.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.isActif.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.date_livraison.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      
        || pg?.campagneTest?.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Build");
    }
  
    // On remplace la liste de Build par les résultats de la recherche
    this.Build = results;
  }
  

  fileNamepdf= 'listeBuilds.pdf';  
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
fileName= 'listeBuilds.xlsx';  

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

  openDetails(BuildId: number) {
    this.isModalOpen = true;

    // Récupérer les détails de la séquence de test
    this.BuildD = new Build(true);
    this.campagneTestService.getBuildById(BuildId).subscribe(data => {
      this.BuildD = data;
    
        // Ouvrir le modal
        this.modalService.open(this.modalDetails, { backdrop: false });

        
    
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getBuilds();
    this.isModalOpen = false;

  }

  
  get formControls() {
    return this.buildForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedBuildId: number = 1;
    
  openUpdate(BuildId: number) {
    this.isModalOpen = true;

    this.campagneTestService.getBuildById(BuildId).subscribe(data => {
      this.selectedBuildId = BuildId;
  
      const selectedcampagneTest = this.campagneTests.find(campagneTest => campagneTest.campagneId === data.campagneTest.campagneId);
      this.buildForm.patchValue({
        titre: data.titre,
      isActif: data.isActif,
     description: data.description,
        date_livraison: new Date(data.date_livraison),
        campagneTestt: selectedcampagneTest,
      });
  
      // Ouvrir le modal
      this.modalService.open(this.modalUpdate, { backdrop: false });
    });
  }
  
  
  onSubmit() {
    console.log(this.buildForm.value); // Ajoutez cette ligne pour vérifier la valeur de campagneTestt

    const selectedcampagneTest = this.buildForm.value.campagneTestt;
    const updatedBuild = {
      ...this.buildForm.value,
      campagneTest: selectedcampagneTest
    };
  
    this.campagneTestService.updateBuild(this.selectedBuildId, updatedBuild).subscribe(data => {
      console.log(data);
      this.toastr.success('Modification réussie !');
    });
  }
  
  

//ajout
@ViewChild('modalAjout') modalAjout!: ElementRef;
isModalOpen = false;


openAjout() {

  

 this.modalService.open(this.modalAjout, { backdrop: false });
 this.isModalOpen = true;

}
nouvelleBuild: Build = new Build(true);

  selectedcampagneTest!: CampagneTest; 
onSubmitAdd() {

  
  const campagneTestId = this.selectedcampagneTest.campagneId;
  const campagneTest = this.campagneTests.find(campagneTest => campagneTest.campagneId === campagneTestId);
  this.nouvelleBuild.campagneTest = campagneTest as CampagneTest;

  this.campagneTestService.createBuild(this.nouvelleBuild)
    .subscribe(
      response => {
        console.log(response); // Affiche la réponse du backend
        this.toastr.success('Ajout réussi !');
      },
      error => {
        console.log(JSON.stringify(this.nouvelleBuild));
    
        // Traitement en cas d'erreur
      }
    );
}





}