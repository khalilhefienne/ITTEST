import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/models/projet';
import { SequenceTest } from 'src/app/models/sequenceTest';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SequenceTestService } from 'src/app/services/sequenceTest/sequence-test.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SenarioTestService } from 'src/app/services/senarioTest/senario-test.service';
import { forkJoin } from 'rxjs';
import { CasTestService } from 'src/app/services/casTest/cas-test.service';
import { SenarioTest } from 'src/app/models/senarioTest';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-list-sequence-test',
  templateUrl: './list-sequence-test.component.html',
  styleUrls: ['./list-sequence-test.component.css']
})
export class ListSequenceTestComponent   implements OnInit,AfterViewInit {
  //ajout
  sequenceForm!: FormGroup;
  isModalOpen = false;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  //sort
  columns = ['titre', 'type', 'perimetre', 'version','date_creation']; // noms des colonnes
  sortColumn = 'titre'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  sequenceTestDetails: any;
  projet!: Projet;
  ProjetD!: Projet;
  SequenceTestD!: SequenceTest;
  //
   SequenceTest: SequenceTest[] = [];
  projets: Projet[] = [];
//ajout

  constructor(private SequenceTestservce: SequenceTestService,private ProjetService: ProjetService, private formBuilder: FormBuilder,
    private router: Router,private SenarioTestService: SenarioTestService,private UtilisateurService : UtilisateurService,
    private CasTestService: CasTestService ,private toastr :ToastrService,private route: ActivatedRoute,private modalService: NgbModal) {
      this.sequenceForm = this.formBuilder.group({
        titre: ['', Validators.required],
        type: ['', Validators.required],
        perimetre: ['', Validators.required],
        version: ['', Validators.required],
        date_creation: new FormControl(new Date().toISOString().substring(0, 10)),
        projetId: [''],
      });

      this.loadUserAuthorities();
     }
  ngAfterViewInit(): void {
  
      
    this.ProjetService.getProjetById(this.route.snapshot.params['projetId']).subscribe(data => {
      this.ProjetD = data;
      // Ouvrir le modal
    });
    this.ProjetService.getProjetList().subscribe(data => {
      this.projets = data;
    });
    this.getSequenceCount();
   
   
   
     }
     id!: number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['projetId'];

    this.getSequenceTests();
    this.onSortColumn(this.sortColumn);


  
  }
  totalSenarios!: number;
  totalCases!: number;
  countSenarios!: number;
  SenarioTest: SenarioTest[] = [];
  private getSequenceTests() {
    this.SequenceTestservce.getSequenceTestsByProjetId(this.route.snapshot.params['projetId']).subscribe(
      data => {
        this.SequenceTest = data;
        const observables = [];
  
        for (let seq of this.SequenceTest) {
          observables.push(
            this.SenarioTestService.getSenarioCountBySeuence(seq.sequence_id)
          );
          this.SenarioTestService.getSenarioTestsBySequenceId(seq.sequence_id).subscribe(
            data => {
              this.SenarioTest = data;
          const observablesSenario = [];
          for (let sen of this.SenarioTest){
            observablesSenario.push(
              this.CasTestService.getCaseCountBySenario(sen.senario_id)
            ); 
       
  
          this.ProjetService.getProjetById(seq.projetId).subscribe(
            projet => {
              this.projets[seq.projetId] = projet;
            },
            error => {
              console.log(error);
            }
          );
        }
        forkJoin(observablesSenario).subscribe(
          casTestSenariosArray => {
            this.totalCases = casTestSenariosArray.reduce((total, casTestSenarios) => total + casTestSenarios, 0);
            console.log('Nombre total de cas  de test :', this.totalCases);
          },
          error => {
            console.error('Une erreur s\'est produite lors du calcul du nombre de cas de test.', error);
          }
        );
      }
        
        );
        }
  
        forkJoin(observables).subscribe(
          senariosSequencesArray => {
            this.totalSenarios = senariosSequencesArray.reduce((total, senarioSequences) => total + senarioSequences, 0);
            console.log('Nombre total de scénarios de test :', this.totalSenarios);
          },
          error => {
            console.error('Une erreur s\'est produite lors du calcul du nombre de scénarios de test.', error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }
  
  onSortColumn(columnName: string) {
    if (columnName !== this.sortColumn) {
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
  
    this.SequenceTest.sort((a: any, b: any) => {
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
  updateSequenceTest(id: number){
    this.router.navigate(['update-sequence', id]);
  }

  deleteSequenceTest(id: number){
    this.SequenceTestservce.deleteSequenceTest(id).subscribe( data => {
      console.log(data);

      this.getSequenceTests();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchSequenceTest(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getSequenceTests();
      return;
    }
  
    const results: SequenceTest[] = [];
    for (const pg of this.SequenceTest) {
      const dateCreation = new Date(pg.date_creation);
      const isDateMatch = dateCreation.toLocaleDateString().indexOf(key) !== -1;
      const versionStr = pg.version.toString();
  
      if (pg.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.perimetre.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || this.projets[pg.projetId]?.nom?.toLowerCase()?.indexOf(key.toLowerCase()) !== -1
        || versionStr.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || isDateMatch) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Sequence Test");
    }
  
    // On remplace la liste de SequenceTest par les résultats de la recherche
    this.SequenceTest = results;
  }
  
  loadProjectss() {
    this.ProjetService.getProjetList().subscribe((projets: Projet[]) => {
      this.projets = projets;
    });
  }
  generatePDF(): void {
    this.SequenceTestservce.getSequenceTestList().subscribe((sequences) => {
      this.SequenceTest = sequences;
      const doc = new jsPDF();
      const columns = ['Titre', 'Type', 'Version', 'Date de creation', 'Perimetre','Projet'];
      const rows = [];
  
      for (const event of this.SequenceTest) {
        rows.push([
          event.titre,
          event.type,
          event.version,
          event.date_creation,
          event.perimetre,
          
          event.projetId
        ]);
      }
  
      const rowsFormatted = rows.map(row => row.map(cell => String(cell)));
  
      autoTable(doc, {
        head: [columns],
        body: rowsFormatted
      });
  
      doc.save('sequences.pdf');
    });
  }
  
/*name of the excel-file which will be downloaded. */ 
fileName= 'listesequences.xlsx';  

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
    this.SequenceTestD = new SequenceTest();
    this.SequenceTestservce.getSequenceTestById(sequenceId).subscribe(data => {
      this.SequenceTestD = data;
      this.ProjetService.getProjetById(this.SequenceTestD.projetId).subscribe(proj => {
        this.projet = proj;
        // Ouvrir le modal
        this.modalService.open(this.modalDetails, { backdrop: false });

        
      });
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getSequenceTests();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.sequenceForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedSequenceId: number =0;
  
  openUpdate(sequenceId: number) {
  

    this.isModalOpen = true;
    this.SequenceTestservce.getSequenceTestById(sequenceId).subscribe(data => {
      this.selectedSequenceId = sequenceId;
      this.sequenceForm.setValue({
      
        titre: data.titre,
        type: data.type,
        perimetre: data.perimetre,
        version: data.version,
        date_creation: new Date(data.date_creation).toISOString().substring(0, 10),
        
        projetId: data.projetId
       
});
   // Ouvrir le modal
   this.modalService.open(this.modalUpdate, { backdrop: false });
});
}
onSubmit() {

  this.SequenceTestservce.updateSequenceTest(this.selectedSequenceId, this.sequenceForm.value).subscribe(data => {
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
nouvelleSequence: SequenceTest = new SequenceTest();

onSubmitAdd() {
  this.SequenceTestservce.addSequenceTest(this.nouvelleSequence, this.route.snapshot.params['projetId'])
    .subscribe(
      (nouvelleSequence: SequenceTest) => {
        console.log('Nouvelle séquence ajoutée :', nouvelleSequence);
        this.toastr.success('Nouvelle séquence ajoutée');
        // Utilisez la nouvelle séquence comme vous le souhaitez...
      },
      (error) => {
        console.error("Une erreur s'est produite lors de l'ajout de la séquence.", error);
        this.toastr.error("Une erreur s'est produite lors de l'ajout de la séquence.");
        // Gérez l'erreur ou affichez un message d'erreur approprié à l'utilisateur
      }
    );
}


creerSenario(id: number){
  this.router.navigate(['senarios', id]);
}
sequenceCount!: number;
 getSequenceCount() {
    this.SequenceTestservce.getSequenceCountByProjet(this.route.snapshot.params['projetId']).subscribe(
      count => {
        this.sequenceCount = count;
        console.log('Nombre de séquences pour le projet :', this.sequenceCount);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de séquences.', error);
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