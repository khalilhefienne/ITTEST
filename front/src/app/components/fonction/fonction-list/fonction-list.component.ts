import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Fonction } from 'src/app/models/fonction';
import { FocntionService } from 'src/app/services/fonction/focntion.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-fonction-list',
  templateUrl: './fonction-list.component.html',
  styleUrls: ['./fonction-list.component.css']
})
export class FonctionListComponent   implements OnInit {
  //ajout
  fonctionForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  //sort
  columns = ['titre','description']; // noms des colonnes
  sortColumn = 'titre'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  fonctionDetails: any;

  FonctionD!: Fonction;
  //
  Fonction!: Fonction[];
  isModalOpen = false;
//ajout

  constructor(private Fonctionservce: FocntionService, private formBuilder: FormBuilder,
    private router: Router,private toastr :ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
 
    this.getFonctions();
    this.onSortColumn(this.sortColumn);


  
  }

  private getFonctions(){
    this.Fonctionservce.getFonctionsList().subscribe(
      data => {
        this.Fonction = data;
       
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
  
    this.Fonction.sort((a: any, b: any) => {
      let x, y;
  
 
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  


  deleteFonction(id: number){
    this.Fonctionservce.deleteFonction(id).subscribe( data => {
      console.log(data);

      this.getFonctions();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchFonction(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getFonctions();
      return;
    }
  
    const results: Fonction[] = [];
    for (const pg of this.Fonction) {
    
  
      if (pg.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Fonction");
    }
  
    // On remplace la liste de Fonction par les résultats de la recherche
    this.Fonction = results;
  }
  

  generatePDF(): void {
    this.Fonctionservce.getFonctionsList().subscribe((fonctions) => {
      this.Fonction = fonctions;
      const doc = new jsPDF();
      const columns = ['Titre', 'Description'];
      const rows = [];
  
      for (const event of this.Fonction) {
        rows.push([
          event.titre,
          event.description,
        
        ]);
      }
  
      const rowsFormatted = rows.map(row => row.map(cell => String(cell)));
  
      autoTable(doc, {
        head: [columns],
        body: rowsFormatted
      });
  
      doc.save('fonctions.pdf');
    });
  }
  
/*name of the excel-file which will be downloaded. */ 
fileName= 'listefonctions.xlsx';  

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
    this.FonctionD = new Fonction(1, '', '');
    this.Fonctionservce.getFonctionById(sequenceId).subscribe(data => {
      this.FonctionD = data;
      // Ouvrir le modal
      this.modalService.open(this.modalDetails, { backdrop: false });
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getFonctions();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.fonctionForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedFctId: number =1;
  
  openUpdate(fctId: number) {
  
    this.isModalOpen = true;
    this.fonctionForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
    
    });
    this.Fonctionservce.getFonctionById(fctId).subscribe(data => {
      this.selectedFctId = fctId;
      this.fonctionForm.setValue({
      
        titre: data.titre,
        description: data.description,
      
       
});
   // Ouvrir le modal
   this.modalService.open(this.modalUpdate, { backdrop: false });
});
}
onSubmit() {
 
  this.Fonctionservce.updateFonction(this.selectedFctId, this.fonctionForm.value).subscribe(data => {
    console.log(data);
    this.toastr.success('Modification réussie !');
  
   
  });
}
//ajout
@ViewChild('modalAjout') modalAjout!: ElementRef;


openAjout() {
  this.isModalOpen = true;
  this.fonctionForm = this.formBuilder.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
   
  });
 
 // Ouvrir le modal
 this.modalService.open(this.modalAjout, { backdrop: false });

}

onSubmitAdd() {
  this.Fonctionservce.createFonction(this.fonctionForm.value).subscribe(data => {
    console.log(data);
    this.toastr.success('ajout du  réussie !');
    
  });
}




}