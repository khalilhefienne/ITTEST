import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Profil } from 'src/app/models/profil';
import { ProfilService } from 'src/app/services/profil/profil.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.css']
})
export class ProfilListComponent  implements OnInit {
  //ajout
  profilForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  isModalOpen = false;
  //sort
  columns = ['nom','description']; // noms des colonnes
  sortColumn = 'nom'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  profilDetails: any;

  ProfilD!: Profil;
  //
  Profil!: Profil[];

//ajout

  constructor(private Profilservce: ProfilService, private formBuilder: FormBuilder,
    private router: Router,private toastr :ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
 
    this.getProfils();
    this.onSortColumn(this.sortColumn);


  
  }

  private getProfils(){
    this.Profilservce.getProfilsList().subscribe(
      data => {
        this.Profil = data;
       
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
  
    this.Profil.sort((a: any, b: any) => {
      let x, y;
  
 
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  


  deleteProfil(id: number){
    this.Profilservce.deleteProfil(id).subscribe( data => {
      console.log(data);

      this.getProfils();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchProfil(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getProfils();
      return;
    }
  
    const results: Profil[] = [];
    for (const pg of this.Profil) {
    
  
      if (pg.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Profil");
    }
  
    // On remplace la liste de Profil par les résultats de la recherche
    this.Profil = results;
  }
  

  generatePDF(): void {
    this.Profilservce.getProfilsList().subscribe((Profils) => {
      this.Profil = Profils;
      const doc = new jsPDF();
      const columns = ['Nom', 'Description'];
      const rows = [];
  
      for (const event of this.Profil) {
        rows.push([
          event.nom,
          event.description,
        
        ]);
      }
  
      const rowsFormatted = rows.map(row => row.map(cell => String(cell)));
  
      autoTable(doc, {
        head: [columns],
        body: rowsFormatted
      });
  
      doc.save('Profils.pdf');
    });
  }
  
/*name of the excel-file which will be downloaded. */ 
fileName= 'listeProfils.xlsx';  

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
    this.ProfilD = new Profil(0, '', '');
    this.Profilservce.getProfilById(sequenceId).subscribe(data => {
      this.ProfilD = data;
      // Ouvrir le modal
      this.modalService.open(this.modalDetails, { backdrop: false });
    });
  }
  
  closeModal() {
    this.isModalOpen = false;
    this.modalService.dismissAll();
    this.getProfils();
  }

  
  get formControls() {
    return this.profilForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedFctId: number =0;
  
  openUpdate(fctId: number) {
  
    this.isModalOpen = true;
    this.profilForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
    
    });
    this.Profilservce.getProfilById(fctId).subscribe(data => {
      this.selectedFctId = fctId;
      this.profilForm.setValue({
      
        nom: data.nom,
        description: data.description,
      
       
});
   // Ouvrir le modal
   this.modalService.open(this.modalUpdate, { backdrop: false });
});
}
onSubmit() {
 
  this.Profilservce.updateProfil(this.selectedFctId, this.profilForm.value).subscribe(data => {
    console.log(data);
    this.toastr.success('Modification réussie !');
  
   
  });
}
//ajout
@ViewChild('modalAjout') modalAjout!: ElementRef;


openAjout() {
  this.isModalOpen = true;
  this.profilForm = this.formBuilder.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
   
  });
 
 // Ouvrir le modal
 this.modalService.open(this.modalAjout, { backdrop: false });

}

onSubmitAdd() {
  this.Profilservce.createProfil(this.profilForm.value).subscribe(data => {
    console.log(data);
    this.toastr.success('ajout du  réussie !');
    
  });
}




}