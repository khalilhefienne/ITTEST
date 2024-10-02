import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MotsCle } from 'src/app/models/motsCle';
import { CasTestService } from 'src/app/services/casTest/cas-test.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-list-mots-cle',
  templateUrl: './list-mots-cle.component.html',
  styleUrls: ['./list-mots-cle.component.css']
})
export class ListMotsCleComponent  implements OnInit {
  //ajout
  motsCleForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  //sort
  columns = ['mot','description']; // noms des colonnes
  sortColumn = 'mot'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  motsCleDetails: any;

  MotsCleD!: MotsCle;
  //
  MotsCle!: MotsCle[];
  isModalOpen = false;
//ajout

  constructor(private CasTestService: CasTestService, private formBuilder: FormBuilder,
    private router: Router,private toastr :ToastrService,private modalService: NgbModal) { 

      this.motsCleForm = this.formBuilder.group({
        mot: ['', Validators.required],
        description: ['', Validators.required],
      
      });
    }

  ngOnInit(): void {
 
    this.getMotsCles();
    this.onSortColumn(this.sortColumn);


  
  }

  private getMotsCles(){
    this.CasTestService.getMotsClesList().subscribe(
      data => {
        this.MotsCle = data;
       
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
  
    this.MotsCle.sort((a: any, b: any) => {
      let x, y;
  
 
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  


  deleteMotsCle(id: number){
    this.CasTestService.deleteMotsCle(id).subscribe( data => {
      console.log(data);

      this.getMotsCles();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchMotsCle(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getMotsCles();
      return;
    }
  
    const results: MotsCle[] = [];
    for (const pg of this.MotsCle) {
    
  
      if (pg.mot.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "MotsCle");
    }
  
    // On remplace la liste de MotsCle par les résultats de la recherche
    this.MotsCle = results;
  }
  

  generatePDF(): void {
    this.CasTestService.getMotsClesList().subscribe((MotsCles) => {
      this.MotsCle = MotsCles;
      const doc = new jsPDF();
      const columns = ['Mot', 'Description'];
      const rows = [];
  
      for (const event of this.MotsCle) {
        rows.push([
          event.mot,
          event.description,
        
        ]);
      }
  
      const rowsFormatted = rows.map(row => row.map(cell => String(cell)));
  
      autoTable(doc, {
        head: [columns],
        body: rowsFormatted
      });
  
      doc.save('MotsCles.pdf');
    });
  }
  
/*name of the excel-file which will be downloaded. */ 
fileName= 'listeMotsCles.xlsx';  

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
    this.MotsCleD = new MotsCle(1, '', '');
    this.CasTestService.getMotsCleById(sequenceId).subscribe(data => {
      this.MotsCleD = data;
      // Ouvrir le modal
      this.modalService.open(this.modalDetails, { backdrop: false });
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getMotsCles();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.motsCleForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedFctId: number =1;
  
  openUpdate(fctId: number) {
  
    this.isModalOpen = true;
  
    this.CasTestService.getMotsCleById(fctId).subscribe(data => {
      this.selectedFctId = fctId;
      this.motsCleForm.setValue({
      
        mot: data.mot,
        description: data.description,
      
       
});
   // Ouvrir le modal
   this.modalService.open(this.modalUpdate, { backdrop: false });
});
}
onSubmit() {
 
  this.CasTestService.updateMotsCle(this.selectedFctId, this.motsCleForm.value).subscribe(data => {
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
  this.CasTestService.createMotsCle(this.motsCleForm.value).subscribe(data => {
    console.log(data);
    this.toastr.success('ajout du  réussie !');
    
  });
}




}