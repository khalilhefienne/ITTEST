import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { SequenceTestService } from 'src/app/services/sequenceTest/sequence-test.service';





@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css']
})
export class ListProjetComponent 
implements OnInit,AfterViewInit {
  //ajout
  projetForm!: FormGroup;
  //pag
  currentPage = 1;
  itemsPerPage = 2;
  isModalOpen = false;
  //sort
  columns = ['nom', 'description', 'prefixe', 'statut','isGestionnaireAnomalie','nomGestionnaire']; // noms des colonnes
  sortColumn = 'nom'; // colonne de tri par défaut
  sortDirection = 'asc'; // direction de tri par défaut
  //detail
  projetTestDetails: any;
  userConnecte: Utilisateur = new Utilisateur();
  utils: any[] = [];
 ProjetD!: Projet;
 users: Utilisateur[] = [];
  //
  Projet!: Projet[];
  Projets!: Projet[];
  //
  nomuser!: String;
//ajout

  constructor(private ProjetService: ProjetService, private formBuilder: FormBuilder,private SequenceTestService :SequenceTestService,
    private router: Router,private toastr :ToastrService,
    private modalService: NgbModal,private UtilisateurService :UtilisateurService) {

      this.projetForm = this.formBuilder.group({
        nom: ['', Validators.required],
        description: ['', Validators.required],
        prefixe: ['', Validators.required],
        statut: ['', Validators.required],
        isGestionnaireAnomalie: [false, Validators.required],
        nomGestionnaire: ['', Validators.required],
        creatorId: [null, Validators.required] // Set creatorId initially to null
      });
      
    
     }
  ngAfterViewInit(): void {
this.getUtilisateurs();
this.UtilisateurService.getUtilisateursList().subscribe(data => {
  this.utils = data;
});
  this.UtilisateurService.getCurrentUser().subscribe(
    (utilisateur) => {
      this.userConnecte = utilisateur;
      this.ProjetD.creatorId = this.userConnecte.id 
      this.nomuser=utilisateur.nom;
      this.projetForm.patchValue({ creatorId: this.userConnecte.id }); // Assign the user's ID to creatorId

      // Initialiser creator avec l'utilisateur connecté
    },
    (erreur) => {
      console.error('Erreur lors de la récupération de l\'utilisateur connecté', erreur);
    }
  );
  }
  private getUtilisateurs(){
    this.UtilisateurService.getUtilisateursList().subscribe(
      data => {
        this.users = data;
       
      },
      error => { console.log(error); }
    );
  }
  ngOnInit(): void {
    this.ProjetD = new Projet();
    this.users = [];
    this.loadUserAuthorities();
    this.getProjets();
    this.getAllProjets()
    this.onSortColumn(this.sortColumn);
   
 
  
  }
creatorId!:number;
prenom!:string;
private getAllProjets(){
  this.UtilisateurService.getCurrentUser().subscribe(
    (utilisateur) => {
      this.userConnecte = utilisateur;
      this.ProjetD.creatorId = this.userConnecte.id 
      this.nomuser=utilisateur.nom;
      this.prenom=utilisateur.prenom;
      this.creatorId=utilisateur.id;
    
      this.ProjetService.getProjetList().subscribe(data => {
        this.Projets = data;
     
      });
      // Initialiser creator avec l'utilisateur connecté
    },
    (erreur) => {
      console.error('Erreur lors de la récupération de l\'utilisateur connecté', erreur);
     // console.log(this.creatorId)
    }
  );

 // console.log(this.creatorId)
}
  private getProjets(){
    this.UtilisateurService.getCurrentUser().subscribe(
      (utilisateur) => {
        this.userConnecte = utilisateur;
        this.ProjetD.creatorId = this.userConnecte.id 
        this.nomuser=utilisateur.nom;
        this.prenom=utilisateur.prenom;
        this.creatorId=utilisateur.id;
      
        this.ProjetService.getProjetsByCreator(this.creatorId).subscribe(data => {
          this.Projet = data;
          console.log(this.creatorId)
        });
        // Initialiser creator avec l'utilisateur connecté
      },
      (erreur) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté', erreur);
       // console.log(this.creatorId)
      }
    );
  
   // console.log(this.creatorId)
  }
 
  
  onSortColumn(columnName: string) {
    if (columnName !== this.sortColumn) {
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
  
    this.Projet.sort((a: any, b: any) => {
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
  

  deleteProjet(id: number){
    this.ProjetService.deleteProjet(id).subscribe( data => {
      console.log(data);

      this.getProjets();
      this.toastr.error("element suuprimé avec succées");

    })
  }
  isGestionnaireAnomalie: boolean = false;

  public searchProjet(key: string): void {
    
    console.log(key);

    if (!key) {
      // Si la clé de recherche est vide, on recharge la liste complète
      this.getProjets();
      return;
    }
  
    const results: Projet[] = [];
    for (const pg of this.Projet) {

      if (
        pg.nom.toLowerCase().includes(key.toLowerCase()) ||
        pg.description.toLowerCase().includes(key.toLowerCase()) ||
        pg.prefixe.toLowerCase().includes(key.toLowerCase()) ||
        pg.statut.toLowerCase().includes(key.toLowerCase()) ||
        pg.creatorId.toString().toLowerCase().includes(key.toLowerCase())||
        (this.isGestionnaireAnomalie.toString().toLowerCase().includes(key.toLowerCase())) ||
        pg.nomGestionnaire.toLowerCase().includes(key.toLowerCase())
      ) {
        results.push(pg);
      }
    }
  
    if (results.length === 0) {
      this.toastr.warning("Aucun résultat trouvé pour la recherche.", "Projet");
    }
  
    // On remplace la liste de SequenceTest par les résultats de la recherche
    this.Projet = results;
  }
  
 

  
  generatePDF(): void {
    this.ProjetService.getProjetList().subscribe((projets) => {
      this.Projet = projets;
      const doc = new jsPDF();
      const columns = ['nom', 'description', 'prefixe', 'statut','isGestionnaireAnomalie','nomGestionnaire','User'];
      const rows = [];
  
      for (const event of this.Projet) {
        rows.push([
          event.description,
          event.isGestionnaireAnomalie,
          event.nom,
          event.nomGestionnaire,
          event.prefixe,
          event.statut,
          event.creatorId
        ]);
      }
  
      const rowsFormatted = rows.map(row => row.map(cell => String(cell)));
  
      autoTable(doc, {
        head: [columns],
        body: rowsFormatted
      });
  
      doc.save('projets.pdf');
    });
  }
  
/*name of the excel-file which will be downloaded. */ 
fileName= 'listesProjets.xlsx';  

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

  openDetails(projetId: number) {
    this.isModalOpen = true;
    this.ProjetService.getProjetById(projetId).subscribe(data => {
      this.ProjetD = data;
      this.ProjetD.creatorId = this.userConnecte.id;
      // Ouvrir le modal
      this.modalService.open(this.modalDetails, { backdrop: false });
    });
    
  }
  
  closeModal() {
    this.modalService.dismissAll();
    this.getProjets();
    this.isModalOpen = false;
  }

  
  get formControls() {
    return this.projetForm.controls;
  }
  //update
  @ViewChild('modalUpdate') modalUpdate!: ElementRef;
  selectedProjetId: number =1;
  
  openUpdate(sequenceId: number) {
    this.isModalOpen = true;

    this.ProjetService.getProjetById(sequenceId).subscribe(data => {
      this.selectedProjetId = sequenceId;
      this.projetForm.setValue({
        nom: data.nom,
        description: data.description,
        prefixe: data.prefixe,
        statut: data.statut,
        creatorId:data.creatorId,
        isGestionnaireAnomalie: data.isGestionnaireAnomalie || true, // Provide a default value if data.isGestionnaireAnomalie is undefined
        nomGestionnaire: data.nomGestionnaire
      });
      
      // Ouvrir le modal
      this.modalService.open(this.modalUpdate, { backdrop: false });
    });
    
}
onSubmit() {
 
  this.ProjetService.updateProjet(this.selectedProjetId, this.projetForm.value).subscribe(data => {
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
  this.ProjetService.createProjet(this.projetForm.value).subscribe(data => {
    console.log(data);
    this.toastr.success('Ajout réussi !');
    this.getProjets(); // Mettre à jour la liste des projets
  });
}
creerSequence(id: number){
  this.router.navigate(['sequences', id]);
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