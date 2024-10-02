import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Etape } from 'src/app/models/etape';
import { CasTest } from 'src/app/models/casTest';
import { CasTestService } from 'src/app/services/casTest/cas-test.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CampagneTest } from 'src/app/models/campagneTest';
import { SenarioTest } from 'src/app/models/senarioTest';
import { CampagneTestService } from 'src/app/services/campagneTest/campagne-test.service';
import { SenarioTestService } from 'src/app/services/senarioTest/senario-test.service';
import { SequenceTestService } from 'src/app/services/sequenceTest/sequence-test.service';
import { SequenceTest } from 'src/app/models/sequenceTest';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
@Component({
  selector: 'app-list-etape',
  templateUrl: './list-etape.component.html',
  styleUrls: ['./list-etape.component.css']
})
export class ListEtapeComponent implements OnInit,AfterViewInit {

  id!: number;
  casTest: CasTest = new CasTest;
  campagneTest!: CampagneTest;
  senarioTest!: SenarioTest;
  sequenceTest!: SequenceTest;
  projet!: Projet;
  user!: Utilisateur;
  //ajout
  etapeForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  isModalOpen = false;
  //sort

  columns = [  'description','resultat_attendu', 'etat_execution','ordre','type_execution']; // noms des colonnes
  sortColumn = 'actions'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  etapeDetails: any;

  EtapeD!: Etape;
  //
  Etape!: Etape[];
  casTests: CasTest[] = [];

//ajout

  constructor(private CasTestService: CasTestService,private projetService: ProjetService,private SequenceTestService: SequenceTestService, private formBuilder: FormBuilder,
  private toastr :ToastrService,private SenarioTestService: SenarioTestService,private userService: UtilisateurService
  ,private CampagneTestService:CampagneTestService,private router: Router,private modalService: NgbModal,private route: ActivatedRoute) {
 
    
  
 
    
     }
     
  ngOnInit(): void {
    this.loadUserAuthorities();
    
    this.etapeForm = this.formBuilder.group({
   
      resultat_attendu: ['', Validators.required],
      description: ['', Validators.required],
      etat_execution: ['', Validators.required],
      ordre: [1, Validators.required],
      casTestt: [''],
      type_execution: ['', Validators.required],

    });
    
      
    


      this.id = this.route.snapshot.params['test_id'];
      console.log(this.id)
     
      
        this.onSortColumn(this.sortColumn);
     
     
  }
  ngAfterViewInit():void{
    this.CasTestService.getCasTestById(this.id).subscribe(
      data => {
        this.casTest = data;
        this.CampagneTestService.getCampagneTestById(this.casTest.campagneId).subscribe(
          campagne => {
            this.campagneTest = campagne;

            // Toutes les données ont été récupérées, vous pouvez effectuer d'autres actions ici

          },
          error => console.log(error)
        );

    
        this.SenarioTestService.getSenarioTestById(this.casTest.senarioId).subscribe(
          senario => {
            this.senarioTest = senario;
    console.log(this.senarioTest)
            this.SequenceTestService.getSequenceTestById(this.senarioTest.sequenceId).subscribe(
              sequence => {
                this.sequenceTest = sequence;
                
                this.projetService.getProjetById(this.sequenceTest.projetId).subscribe(
                  proj => {
                    this.projet = proj;
                  
                    this.userService.getUtilisateurById(this.projet.creatorId).subscribe(
                      user => {
                        this.user = user;});
                  
                  
                  });
               

              },
              error => console.log(error)
            );
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );

    this.getEtapes();
    this.getcasTests();
      //nombre ex :
  this.getExecutionCount();
  //nombre etape
  this.getEtapeCount();


    
  }

// Appel à l'API ou à un service pour récupérer la liste des casTests depuis le backend
getcasTests() {
  this.CasTestService.getCasTestsList().subscribe(
    casTests => {
      console.log(casTests); // Vérifier les valeurs récupérées depuis le backend
      this.casTests = casTests;
    },
    error => {
      console.log('Erreur lors de la récupération des casTests : ', error);
    }
  );
}


  private getEtapes(){
    this.CasTestService.getEtapesByCasTest(this.route.snapshot.params['test_id']).subscribe(
      data => {
        this.Etape = data;
     
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
  
    this.Etape.sort((a: any, b: any) => {
      let x, y;
  
      if (columnName === 'casTest') {
        // Tri par nom de fonction pour la colonne "fonction"
        const fonctionA = this.casTests.find((casTest: CasTest) => casTest.test_id === a[columnName]);
        const fonctionB = this.casTests.find((casTest: CasTest) => casTest.test_id === b[columnName]);
        x = fonctionA?.titre;
        y = fonctionB?.titre;
      }
    
      
       else {
        // Tri par valeur directe pour les autres colonnes
        x = a[columnName];
        y = b[columnName];
      }
  
      if (x < y) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (x > y) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });
  }
  

  deleteEtape(id: number){
    this.CasTestService.deleteEtape(id).subscribe( data => {
      console.log(data);

      this.getEtapes();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  public searchEtape(key: string): void {
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getEtapes();
      return;
    }
  
    const results: Etape[] = [];
    for (const pg of this.Etape) {
    
      if (
        
        pg.resultat_attendu.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.etat_execution.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg.ordre.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
        || pg?.casTest?.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Etape");
    }
  
    // On remplace la liste de Etape par les résultats de la recherche
    this.Etape = results;
  }
  

  fileNamepdf= 'listeEtapes.pdf';  
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
fileName= 'listeEtapes.xlsx';  

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

  openDetails(EtapeId: number) {
    this.isModalOpen = true;
    // Récupérer les détails de la séquence de test
    this.EtapeD = new Etape();
    this.CasTestService.getEtapeById(EtapeId).subscribe(data => {
      this.EtapeD = data;
    
        // Ouvrir le modal
        this.modalService.open(this.modalDetails, { backdrop: false });

        
    
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getEtapes();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.etapeForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedEtapeId: number = 1;
    
  openUpdate(EtapeId: number) {
    this.isModalOpen = true;
    this.CasTestService.getEtapeById(EtapeId).subscribe(data => {
      this.selectedEtapeId = EtapeId;
  
      const selectedCasTest = this.casTests.find(casTest => casTest.test_id === data.casTest.test_id);
      this.etapeForm.setValue({
    
        resultat_attendu: data.resultat_attendu,
        etat_execution: data.etat_execution,
        ordre: data.ordre,
        description: data.description,
        type_execution: data.type_execution,

        casTestt: selectedCasTest,
      });
  
      // Ouvrir le modal
      this.modalService.open(this.modalUpdate, { backdrop: false });
    });
  }
  
  
  onSubmit() {
    console.log(this.etapeForm.value); // Ajoutez cette ligne pour vérifier la valeur de casTestt

    const selectedCasTest = this.etapeForm.value.casTestt;
    const updatedEtape = {
      ...this.etapeForm.value,
      casTest: selectedCasTest
    };
  
    this.CasTestService.updateEtape(this.selectedEtapeId, updatedEtape).subscribe(data => {
      console.log(data);
      this.toastr.success('Modification réussie !');
    });
  }
  
  

//ajout
@ViewChild('modalAjout') modalAjout!: ElementRef;

selectedCasTest!: CasTest; 
openAjout() {

  this.isModalOpen = true;

 // Ouvrir le modal
 this.modalService.open(this.modalAjout, { backdrop: false });

}
nouvelleEtape: Etape = new Etape();

 

onSubmitAdd() {
  
  this.CasTestService.createEtape(this.nouvelleEtape, this.route.snapshot.params['test_id'])
    .then(nouvelleEtape => {
      console.log('Nouvelle étape ajoutée :', nouvelleEtape);
      this.toastr.success('Nouvelle étape ajoutée');
      // Utilisez la nouvelle étape comme vous le souhaitez...
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de l\'ajout de l\'étape.', error);
      this.toastr.error('Une erreur s\'est produite lors de l\'ajout de l\'étape.');
      // Gérez l'erreur ou affichez un message d'erreur approprié à l'utilisateur
    });
}



ajouterExecution() {
  this.CasTestService.ajouterExecution(this.route.snapshot.params['test_id'])
    .then(resultat => {
      console.log('Le résultat de l\'exécution :', resultat);
    // Utilisez le résultat comme vous le souhaitez...
    let toastOptions: Partial<IndividualConfig> = {
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      positionClass: 'toast-top-center',
      easing: 'ease-out', // Modifier l'effet d'animation ici
      timeOut: 5000,
      extendedTimeOut: 1000,
      toastClass: 'custom-toast',
    };
    
    if (resultat === '"Échec"') {
      this.toastr.error(resultat, 'Résultat de l\'exécution', toastOptions);
    } else if (resultat === '"Bloqué"') {
      this.toastr.warning(resultat, 'Résultat de l\'exécution', toastOptions);
    } else if (resultat === '"Succès"') {
      this.toastr.success(resultat, 'Résultat de l\'exécution', toastOptions);
    } 

    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de l\'ajout de l\'exécution.', error);
      // Gérez l'erreur ou affichez un message d'erreur approprié à l'utilisateur
      this.toastr.warning('Une erreur s\'est produite lors de l\'ajout de l\'exécution.', 'Erreur');
    });
}
//nombre des executions dans ce cas de test
executionCount!: number;
getExecutionCount(): void {
  this.CasTestService.getExecutionCountByTestCase(this.route.snapshot.params['test_id'])
      .subscribe(count => {
        this.executionCount = count;
        // Faites autre chose avec la valeur count si nécessaire
      });
}
//nombre des etapes dans ce cas de test
etapeCount!: number;
getEtapeCount(): void {
  this.CasTestService.getEtapeCountByTestCase(this.route.snapshot.params['test_id'])
      .subscribe(count => {
        this.etapeCount = count;
        // Faites autre chose avec la valeur count si nécessaire
      });
}
userAuthorities: string[] = [];

loadUserAuthorities() {
  this.userService.getUserAuthorities().subscribe(
    (authorities: string[]) => {
      this.userAuthorities = authorities;
    },
    (error) => {
      // Gérer les erreurs lors de la récupération des autorisations
    }
  );

}
}