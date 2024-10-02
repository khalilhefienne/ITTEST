import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Platform } from 'src/app/models/platform';
import { CampagneTestService } from 'src/app/services/campagneTest/campagne-test.service';
import { CasTestService } from 'src/app/services/casTest/cas-test.service';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
@Component({
  selector: 'app-list-platform',
  templateUrl: './list-platform.component.html',
  styleUrls: ['./list-platform.component.css']
})
export class ListPlatformComponent implements OnInit {
  //ajout
  platFormForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  //sort
  columns = ['platform','EnDesign','EnExecution']; // noms des colonnes
  sortColumn = 'platform'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  PlatformDetails: any;

  PlatformD!: Platform;
  //
  Platform!: Platform[];
  isModalOpen = false;
//ajout

  constructor(private CampagneTestService: CampagneTestService,private UtilisateurService : UtilisateurService, private formBuilder: FormBuilder,
    private router: Router,private toastr :ToastrService,private modalService: NgbModal) { 
      this.platFormForm = this.formBuilder.group({
        platform: new FormControl('', Validators.required),
        EnDesign: new FormControl(false),
        EnExecution:new FormControl(false),
       
      });
    }

  ngOnInit(): void {
    this.loadUserAuthorities();
    this.getPlatforms();
    this.onSortColumn(this.sortColumn);


  
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

  private getPlatforms(){
    this.CampagneTestService.getPlatformsList().subscribe(
      data => {
        this.Platform = data;
       
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
  
    this.Platform.sort((a: any, b: any) => {
      let x, y;
  
 
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  


  deletePlatform(id: number){
    this.CampagneTestService.deletePlatform(id).subscribe( data => {
      console.log(data);

      this.getPlatforms();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchPlatform(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getPlatforms();
      return;
    }
  
    const results: Platform[] = [];
    for (const pg of this.Platform) {
    
  
      if (pg.platform.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.EnDesign.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.EnExecution.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Platform");
    }
  
    // On remplace la liste de Platform par les résultats de la recherche
    this.Platform = results;
  }
  

  fileNamepdf= 'listePlatforms.pdf';  
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
fileName= 'listePlatforms.xlsx';  

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

  openDetails(sequenceId: number) {
    this.isModalOpen = true;

    // Récupérer les détails de la séquence de test
    this.PlatformD = new Platform(1, false,'',false);
    this.CampagneTestService.getPlatformById(sequenceId).subscribe(data => {
      this.PlatformD = data;
      // Ouvrir le modal
      this.modalService.open(this.modalDetails, { backdrop: false });
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getPlatforms();
    this.isModalOpen = false;

  }

  
  get formControls() {
    return this.platFormForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedpltId: number =1;
  
  openUpdate(pltId: number) {
    this.isModalOpen = true;

  
    this.CampagneTestService.getPlatformById(pltId).subscribe(data => {
      this.selectedpltId = pltId;
      this.platFormForm.patchValue({
        platform: data.platform,
        EnExecution: data.EnExecution,
        EnDesign: data.EnDesign,
      });
  
      this.modalService.open(this.modalUpdate, { backdrop: false });
    });
  }
  
onSubmit() {
 
  this.CampagneTestService.updatePlatform(this.selectedpltId, this.platFormForm.value).subscribe(data => {
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

onSubmitAdd() {
  this.platFormForm.value.Enexecution = this.platFormForm.get('EnExecution')?.value;
  this.platFormForm.value.EnDesgn = this.platFormForm.get('EnDesign')?.value;

  this.CampagneTestService.createPlatform(this.platFormForm.value).subscribe(data => {
    console.log(data);
    this.toastr.success('Ajout réussi !');
  });
}




}