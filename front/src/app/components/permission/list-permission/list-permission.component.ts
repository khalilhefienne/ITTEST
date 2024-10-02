import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fonction } from 'src/app/models/fonction';
import { Permission } from 'src/app/models/permission';
import { Profil } from 'src/app/models/profil';
import { FocntionService } from 'src/app/services/fonction/focntion.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { ProfilService } from 'src/app/services/profil/profil.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-list-permission',
  templateUrl: './list-permission.component.html',
  styleUrls: ['./list-permission.component.css']
})
export class ListPermissionComponent implements OnInit,AfterViewInit {
  //ajout
  permissionForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  isModalOpen = false;
  //sort
  types = ['ACCESS_TOTAL', 'READ_ONLY'];

  columns = [ 'type', 'profil', 'fonction']; // noms des colonnes
  sortColumn = 'type'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  permissionDetails: any;

  PermissionD!: Permission;
  //
  Permission!: Permission[];
  fonctions: Fonction[] = [];
  profils: Profil[] = [];
//ajout

  constructor(private PermissionService: PermissionService,private ProfilService: ProfilService
    ,private FocntionService: FocntionService, private formBuilder: FormBuilder,
  private toastr :ToastrService,private modalService: NgbModal) {
 
    
  
    this.permissionForm = this.formBuilder.group({
      type: ['', Validators.required],

      fonctionn: [''],
      profill: [''],

    });
    
    
     }

  ngOnInit(): void {
   
    this.getPermissions();
      this.onSortColumn(this.sortColumn);
  


  
  }
  ngAfterViewInit():void{

    this.getFonctions();
    this.getProfils();

    
  }
  getProfils() {
    this.ProfilService.getProfilsList().subscribe(
      casTests => {
        console.log(casTests); // Vérifier les valeurs récupérées depuis le backend
        this.profils = casTests;
      },
      error => {
        console.log('Erreur lors de la récupération des casTests : ', error);
      }
    );
  }
// Appel à l'API ou à un service pour récupérer la liste des casTests depuis le backend
getFonctions() {
  this.FocntionService.getFonctionsList().subscribe(
    casTests => {
      console.log(casTests); // Vérifier les valeurs récupérées depuis le backend
      this.fonctions = casTests;
    },
    error => {
      console.log('Erreur lors de la récupération des casTests : ', error);
    }
  );
}


  private getPermissions(){
    this.PermissionService.getPermissionsList().subscribe(
      data => {
        this.Permission = data;
     
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
  
    this.Permission.sort((a: any, b: any) => {
      let x, y;
  
    
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  

  deletePermission(id: number){
    this.PermissionService.deletePermission(id).subscribe( data => {
      console.log(data);

      this.getPermissions();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchPermission(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getPermissions();
      return;
    }
  
    const results: Permission[] = [];
    for (const pg of this.Permission) {
    
      if (
        pg.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg?.profil?.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg?.fonction?.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Permission");
    }
  
    // On remplace la liste de Permission par les résultats de la recherche
    this.Permission = results;
  }
  

  fileNamepdf= 'listePermissions.pdf';  
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
fileName= 'listePermissions.xlsx';  

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

  openDetails(PermissionId: number) {
    this.isModalOpen = true;
    // Récupérer les détails de la séquence de test
    this.PermissionD = new Permission();
    this.PermissionService.getPermissionById(PermissionId).subscribe(data => {
      this.PermissionD = data;
    
        // Ouvrir le modal
        this.modalService.open(this.modalDetails, { backdrop: false });

        
    
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getPermissions();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.permissionForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedPermissionId: number = 0;
    
  openUpdate(PermissionId: number) {
    this.isModalOpen = true;
    this.PermissionService.getPermissionById(PermissionId).subscribe(data => {
      this.selectedPermissionId = PermissionId;
      const selectedProfil = this.profils.find(profil => profil.profil_id === data.profil.profil_id);

      const selectedFonction = this.fonctions.find(fonction => fonction.fonction_id === data.fonction.fonction_id);
      this.permissionForm.setValue({
        type: data.type,
       
        fonctionn: selectedFonction,
        profill: selectedProfil,
      });
  
      // Ouvrir le modal
      this.modalService.open(this.modalUpdate, { backdrop: false });
    });
  }
  
  
  onSubmit() {
    console.log(this.permissionForm.value); // Ajoutez cette ligne pour vérifier la valeur de casTestt
    const selectedFonction= this.permissionForm.value.fonctionn;
    const selectedCProfil= this.permissionForm.value.profill;
    const updatedPermission = {
      ...this.permissionForm.value,
      profil: selectedCProfil,
      fonction:selectedFonction
    };
  
    this.PermissionService.updatePermission(this.selectedPermissionId, updatedPermission).subscribe(data => {
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
nouvellePermission: Permission = new Permission();
selectedProfil!: Profil; 
  selectedFonction!: Fonction; 
onSubmitAdd() {

  //profil
  const profilId = this.selectedProfil.profil_id;
  const profil = this.profils.find(profil => profil.profil_id === profilId);
  this.nouvellePermission.profil = profil as Profil;
//focntion
const fonctionId = this.selectedProfil.profil_id;
  const fonction = this.fonctions.find(fonction => fonction.fonction_id === fonctionId);
  this.nouvellePermission.fonction = fonction as Fonction;


  //
  //
  this.PermissionService.createPermission(this.nouvellePermission)
    .subscribe(
      response => {
        console.log(response); // Affiche la réponse du backend
        this.toastr.success('Ajout réussi !');
      },
      error => {
        console.log(JSON.stringify(this.nouvellePermission));
    
        // Traitement en cas d'erreur
      }
    );
}





}