import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { FormBuilder, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FonctionListComponent } from './components/fonction/fonction-list/fonction-list.component';

import {MatDialogModule} from '@angular/material/dialog';

import { ListPermissionComponent } from './components/permission/list-permission/list-permission.component';

import { ProfilListComponent } from './components/profil/profil-list/profil-list.component';
import {  JwtModule } from '@auth0/angular-jwt';
import { ListProjetComponent } from './components/projet/list-projet/list-projet.component';

import { CKEditorModule } from 'ckeditor4-angular';
import { ListSenarioTestComponent } from './components/senarioTest/list-senario-test/list-senario-test.component';
import { ListSequenceTestComponent } from './components/sequenceTest/list-sequence-test/list-sequence-test.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListCasTestComponent } from './components/CatTest/list-cas-test/list-cas-test.component';
import { ListEtapeComponent } from './components/CatTest/list-etape/list-etape.component';
import { ListMotsCleComponent } from './components/CatTest/list-mots-cle/list-mots-cle.component';
import { ListBuildComponent } from './components/campagneTest/list-build/list-build.component';
import { ListPlatformComponent } from './components/campagneTest/list-platform/list-platform.component';
import { ListCampagneComponent } from './components/campagneTest/list-campagne/list-campagne.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { ChatbotComponent } from './components/chatbot/chatbot/chatbot.component';
import { ListExecutionComponent } from './components/CatTest/list-execution/list-execution.component';








@NgModule({
  declarations: [
    AppComponent,
   

    UtilisateurComponent,
 
   
      LoginComponent,
      HeaderComponent,
      FooterComponent,
      SidebarComponent,
      ForgetPasswordComponent,
      HomeComponent,
    
      FonctionListComponent,
   
 
      ListPermissionComponent,
    
      
     
      ProfilListComponent,
 
      ListProjetComponent,
   
    
    
      ListSenarioTestComponent,
    
      ListSequenceTestComponent,
           ListCasTestComponent,
           ListEtapeComponent,
           ListMotsCleComponent,
         
           ListBuildComponent,
           ListPlatformComponent,
           ListCampagneComponent,
           ListUserComponent,
           ChatbotComponent,
           ListExecutionComponent,
      
          
       
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    JwtModule ,
    NgbModule,
    NgxPaginationModule,
    CKEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    ToastrModule.forRoot(
      {timeOut:2000,
        progressBar:true,
        progressAnimation: 'increasing',
        preventDuplicates: true


      }
    ),
       

  ],
  providers: [
    // Ajoutez l'intercepteur d'authentification dans les intercepteurs HTTP de votre application
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
