import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { Profil } from 'src/app/models/profil';
import { ProfilService } from 'src/app/services/profil/profil.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent  implements OnInit ,AfterViewInit {
  //ajout
  userForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  //sort
  columns = ['username', 'image', 'email', 'nom', 'prenom', 'profil', 'statut', 'date_creation'] ;
   sortColumn = 'username'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  userDetails: any;

  UtilisateurD!: Utilisateur;
  //
 
  profils: Profil[] = [];

  

  Utilisateur!: Utilisateur[];
  isModalOpen = false;
//ajout

  constructor(private Utilisateurservce: UtilisateurService, private formBuilder: FormBuilder,
    private ProfilService: ProfilService,
    private router: Router,private toastr :ToastrService,private modalService: NgbModal) {


      this.userForm = this.formBuilder.group({
        email: ['', Validators.required],
        nom: ['', Validators.required],
        username: ['', Validators.required],
        prenom: ['', Validators.required],
        statut: [true],  
        profill: [''],
   
  
      });
      

     }

  ngOnInit(): void {
 
    this.getUtilisateurs();
    this.onSortColumn(this.sortColumn);


  
  }
  ngAfterViewInit():void{

    this.getUtilisateurs();
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
  private getUtilisateurs(){
    this.Utilisateurservce.getUtilisateursList().subscribe(
      data => {
        this.Utilisateur = data;
       
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
  
    this.Utilisateur.sort((a: any, b: any) => {
      let x, y;
  
 
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  


  deleteUtilisateur(id: number){
    this.Utilisateurservce.deleteUtilisateur(id).subscribe( data => {
      console.log(data);

      this.getUtilisateurs();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchUtilisateur(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getUtilisateurs();
      return;
    }
  
    const results: Utilisateur[] = [];
    for (const pg of this.Utilisateur) {
    
  
      if ( (pg.image && pg.image.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      || (pg.password && pg.password.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      || (pg.email && pg.email.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      || (pg.nom && pg.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      || (pg.prenom && pg.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      || (pg.profil && pg.profil.nom && pg.profil.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1)

    || pg.statut.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || pg.date_creation.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
  ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Utilisateur");
    }
  
    // On remplace la liste de Utilisateur par les résultats de la recherche
    this.Utilisateur = results;
  }
  
  fileNamepdf= 'listeUsers.pdf';  
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
fileName= 'listeUtilisateurs.xlsx';  

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
    this.UtilisateurD = new Utilisateur();
    this.Utilisateurservce.getUtilisateurById(sequenceId).subscribe(data => {
      this.UtilisateurD = data;
      // Ouvrir le modal
      this.modalService.open(this.modalDetails, { backdrop: false });
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getUtilisateurs();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.userForm.controls;
  }
  
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedUtilisateurId: number = 1;
    
  openUpdate(UtilisateurId: number) {
    this.isModalOpen = true;
    this.Utilisateurservce.getUtilisateurById(UtilisateurId).subscribe(data => {
      this.selectedUtilisateurId = UtilisateurId;
      const selectedProfil = this.profils.find(profil => profil.profil_id === data.profil.profil_id);

      this.userForm.setValue({
        email: data.email,
        nom: data.nom,
        username:data.username,
        prenom: data.prenom,
        statut: data.statut,
        profill: selectedProfil,
      });
   
      // Ouvrir le modal
      this.modalService.open(this.modalUpdate, { backdrop: false });
    });
  }
  
  
  onSubmit() {
    console.log(this.userForm.value); // Ajoutez cette ligne pour vérifier la valeur de casTestt
    const selectedCProfil= this.userForm.value.profill;
    const updatedPermission = {
      ...this.userForm.value,
      profil: selectedCProfil,
    
    };
  
    this.Utilisateurservce.updateUtilisateur(this.selectedUtilisateurId, updatedPermission).subscribe(data => {
      console.log(data);
      this.toastr.success('Modification réussie !');
    });
  }
  





}