import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SenarioTest } from 'src/app/models/senarioTest';
import { SequenceTest } from 'src/app/models/sequenceTest';
import { SenarioTestService } from 'src/app/services/senarioTest/senario-test.service';
import { SequenceTestService } from 'src/app/services/sequenceTest/sequence-test.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-list-senario-test',
  templateUrl: './list-senario-test.component.html',
  styleUrls: ['./list-senario-test.component.css']
})
export class ListSenarioTestComponent implements OnInit,AfterViewInit {
  //ajout
  senarioForm!: FormGroup;
  senarioFormupdate!:FormGroup;
  sequences: any[] = [];
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  isModalOpen = false;
  //sort
  columns = ['nom', 'details']; // noms des colonnes
  sortColumn = 'nom'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut

  SenarioTest!: SenarioTest[];
 
  SequenceTest: SequenceTest[] = [];
  constructor( private formBuilder: FormBuilder,
    private SequenceTestService: SequenceTestService,private SenarioTestService: SenarioTestService,private UtilisateurService : UtilisateurService,
    private router: Router,private toastr :ToastrService,private modalService: NgbModal,private route: ActivatedRoute) {
      this.senarioFormupdate = this.formBuilder.group({
     
        nom: ['', Validators.required],
        details: ['', Validators.required],
       
      
        sequence_id: [''],
      });

      this.senarioForm = this.formBuilder.group({
     
        nom: ['', Validators.required],
        details: ['', Validators.required],
       
      
        //sequence_id: ['', Validators.required],
      });
      this.loadUserAuthorities();
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
     SequenceD!: SequenceTest;
  ngAfterViewInit(): void {

    this.SequenceTestService.getSequenceTestById(this.route.snapshot.params['sequenceId']).subscribe(data => {
      this.SequenceD = data;
      // Ouvrir le modal
    });
    this.SequenceTestService.getSequenceTestList().subscribe(data => {
      this.sequences = data;
    });
   
  
      }

  ngOnInit(): void {
 
    this.getSenarioTests();
    this.onSortColumn(this.sortColumn);
  }

  private getSenarioTests(){
    this.SenarioTestService.getSenarioTestsBySequenceId(this.route.snapshot.params['sequenceId']).subscribe(
      data => {
        this.SenarioTest = data;
        for (let sen of this.SenarioTest) {
          this.SequenceTestService.getSequenceTestById(sen.sequenceId).subscribe(
            sequence => { this.SequenceTest[sen.sequenceId] = sequence; },
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
  
    this.SenarioTest.sort((a: any, b: any) => {
      let x, y;
  
      if (columnName === 'sequence') {
        // Tri par nom de projet pour la colonne "projet_id"
        const projetA = this.SequenceTest.find((projet: SequenceTest) => projet.sequence_id === a[columnName]);
        const projetB = this.SequenceTest.find((projet: SequenceTest) => projet.sequence_id === b[columnName]);
        x = projetA?.titre;
        y = projetB?.titre;

      } else {
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      }
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  generatePDF(): void {
    this.SenarioTestService.getSenarioTestList().subscribe((sequences) => {
      this.SenarioTest = sequences;
      const doc = new jsPDF();
      const columns = ['Nom', 'Details'];
      const rows: any[] = [];
  
      for (const event of this.SenarioTest) {
        rows.push([
          event.nom,
          event.details,
          event.sequenceId
        ]);
      }
  
      const rowsFormatted = rows.map(row => row.map((cell: string | number | boolean | null | undefined) => String(cell)));
  
      autoTable(doc, {
        head: [columns],
        body: rowsFormatted
      });
  
      doc.save('senarios.pdf');
    });
  }
  
/*name of the excel-file which will be downloaded. */ 
fileName= 'listesenarios.xlsx';  

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
  
  
  SenarioTestDetails(id: number){
    this.router.navigate(['senario-details', id]);
  }

  updateSenarioTest(id: number){
    this.router.navigate(['update-senario', id]);
  }

  deleteSenarioTest(id: number){
    this.SenarioTestService.deleteSenarioTest(id).subscribe( data => {
      console.log(data);

      this.getSenarioTests();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchSenarioTest(key: string): void {
    console.log(key);
  
    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getSenarioTests();
      return;
    }
  
    const results: SenarioTest[] = [];
    for (const senarioTest of this.SenarioTest) {
      const details = this.stripHtmlTags(senarioTest.details); // Obtenir le contenu du checheditor sans balises HTML

      if (
        senarioTest.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        details.toLowerCase().indexOf(key.toLowerCase()) !== -1 

      ) {
        results.push(senarioTest);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Senario Test");
    }
  
    // On remplace la liste de SenarioTest par les résultats de la recherche
    this.SenarioTest = results;
  }
  private stripHtmlTags(html: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  }
  
  loadSequences() {
    this.SequenceTestService.getSequenceTestList().subscribe((sequences: SequenceTest[]) => {
      this.SequenceTest = sequences;
    });
  }
  sequence!: SequenceTest;
   //detail
   @ViewChild('modalDetails') modalDetails!: ElementRef;
   SenarioTestD!: SenarioTest;
   openDetails(senarioId: number) {
    this.isModalOpen = true;
     // Récupérer les détails de la séquence de test
     this.SenarioTestD = new SenarioTest();
     this.SenarioTestService.getSenarioTestById(senarioId).subscribe(data => {
       this.SenarioTestD = data;
       this.SequenceTestService.getSequenceTestById(this.SenarioTestD.sequenceId).subscribe(sequence => {
         this.sequence = sequence;
         // Ouvrir le modal
         this.modalService.open(this.modalDetails, { backdrop: false });
 
         
       });
     });
   }
   
   closeModal() {
     this.modalService.dismissAll();
     this.getSenarioTests();
     this.isModalOpen = false;
   }
 
   
   get formControls() {
     return this.senarioForm.controls;
   }
   //update
   @ViewChild('modalUpdate') modalUpdate!: ElementRef;
   selectedSenarioId: number =0;
   
   openUpdate(senarioId: number) {
    this.isModalOpen = true;
     this.SenarioTestService.getSenarioTestById(senarioId).subscribe(data => {
       this.selectedSenarioId = senarioId;
       this.senarioFormupdate.setValue({
       
        nom: data.nom,
        details: data.details,
     
  
        sequence_id: data.sequenceId
        
 });
    // Ouvrir le modal
    this.modalService.open(this.modalUpdate, { backdrop: false });
 });
 }
 
 onSubmit() {

  this.SenarioTestService.updateSenarioTest(this.selectedSenarioId, this.senarioFormupdate.value).subscribe(data => {
    console.log(data);
    this.toastr.success('Modification réussie !');
    this.router.navigate(['/senarios']);
  });
 }
 //ajout
 @ViewChild('modalAjout') modalAjout!: ElementRef;
 
 
 openAjout() {
  this.isModalOpen = true;
  // Ouvrir le modal
  this.modalService.open(this.modalAjout, { backdrop: false });
 
 }
 
 
 //nouvelleSenario: SenarioTest = new SenarioTest();

onSubmitAdd() {
  this.SenarioTestService.addSenarioTest(this.senarioForm.value, this.route.snapshot.params['sequenceId'])
    .subscribe(
      (data: SenarioTest) => {
        console.log('Nouvelle senario ajoutée :', data);
        this.toastr.success('Nouvelle senario ajoutée');
        // Utilisez la nouvelle séquence comme vous le souhaitez...
      },
      (error) => {
        console.error("Une erreur s'est produite lors de l'ajout de la senario.", error);
        this.toastr.error("Une erreur s'est produite lors de l'ajout de la senario.");
        // Gérez l'erreur ou affichez un message d'erreur approprié à l'utilisateur
      }
    );
}
creerCasTest(id: number){
  this.router.navigate(['casTests', id]);
}
 
}