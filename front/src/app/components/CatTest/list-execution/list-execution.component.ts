import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Execution } from 'src/app/models/execution';
import { CasTestService } from 'src/app/services/casTest/cas-test.service';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';
import {
  CalendarEvent,
  CalendarView,
 
} from 'angular-calendar';
@Component({
  selector: 'app-list-execution',
  templateUrl: './list-execution.component.html',
  styleUrls: ['./list-execution.component.css']
})
export class ListExecutionComponent implements AfterViewInit {

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  // Remplacez les événements statiques par la liste d'exécutions
  Execution!: Execution[];
  constructor(private CasTestService: CasTestService,private UtilisateurService : UtilisateurService,
    private toastr :ToastrService,
    private modalService: NgbModal,private route: ActivatedRoute){
    // Utilisez le résultat de getExecutionss pour remplir la liste d'exécutions
    this.getExecutionss();
  }
  ngAfterViewInit():void{
    this.getExecutionss();
  

    
  }
  private getExecutionss() {
    this.CasTestService.getExecutionsByCasTest(this.route.snapshot.params['test_id']).subscribe(
      data => {
        this.Execution = data;
        console.log(this.route.snapshot.params['test_id']);
      },
      error => {
        console.log(error);
        console.log(this.route.snapshot.params['test_id']);
      }
    );
  }
 
  activeDayIsOpen: boolean = true;

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


  // Transformez les objets Execution en objets CalendarEvent avec couleur
  convertToCalendarEvents(executions: Execution[]): CalendarEvent<any>[] {
    return executions.map((execution) => {
      let color: any = {}; // Définir la couleur par défaut
  
      // Déterminer la couleur en fonction de la valeur de execution.resultat
      if (execution.resultat === 'Bloqué') {
        color = {
          primary: 'red', // Couleur rouge pour Bloqué
          secondary: 'red',
        };
      } else if (execution.resultat === 'Échec') {
        color = {
          primary: 'yellow', // Couleur jaune pour Échec
          secondary: 'yellow',
        };
      } else {
        color = {
          primary: 'green', // Couleur verte pour le succès
          secondary: 'green',
        };
      }
  
      const calendarEvent: CalendarEvent<any> = {
        start: new Date(execution.date),
        end: execution.date ? new Date(execution.date) : undefined,
        title: execution.resultat,
        color: color, // Utiliser l'objet color tel quel
        cssClass: 'event-' + execution.resultat.toLowerCase(), // Classe CSS pour l'événement
      };
      return calendarEvent;
    });
  }
  

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
 


}