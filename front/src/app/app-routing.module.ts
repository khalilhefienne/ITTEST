import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { FonctionListComponent } from './components/fonction/fonction-list/fonction-list.component';
;
import { ListPermissionComponent } from './components/permission/list-permission/list-permission.component';


import { ProfilListComponent } from './components/profil/profil-list/profil-list.component';

import { ListProjetComponent } from './components/projet/list-projet/list-projet.component';
import { ListSequenceTestComponent } from './components/sequenceTest/list-sequence-test/list-sequence-test.component';
import { ListSenarioTestComponent } from './components/senarioTest/list-senario-test/list-senario-test.component';
import { ListEtapeComponent } from './components/CatTest/list-etape/list-etape.component';
import { ListCasTestComponent } from './components/CatTest/list-cas-test/list-cas-test.component';
import { ListMotsCleComponent } from './components/CatTest/list-mots-cle/list-mots-cle.component';
import { ListCampagneComponent } from './components/campagneTest/list-campagne/list-campagne.component';
import { ListPlatformComponent } from './components/campagneTest/list-platform/list-platform.component';
import { ListBuildComponent } from './components/campagneTest/list-build/list-build.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { ChatbotComponent } from './components/chatbot/chatbot/chatbot.component';
import { ListExecutionComponent } from './components/CatTest/list-execution/list-execution.component';

const routes: Routes = [

 // {path: 'fonction', component: FonctionComponent,canActivate: [AuthGuard]},
  {path: 'register', component: UtilisateurComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgetPassword', component: ForgetPasswordComponent},
  {path: 'home', component: HomeComponent,  },
  {path: 'fonctions', component: FonctionListComponent, },

  {path: 'permissions', component: ListPermissionComponent,},

  {path: 'profils', component: ProfilListComponent,},
  {path: 'users', component: ListUserComponent, },

  {path: 'chat', component: ChatbotComponent, },

  {path: 'projets', component: ListProjetComponent, },

  {path: 'sequences/:projetId', component: ListSequenceTestComponent, },
 
  {path: 'senarios/:sequenceId', component: ListSenarioTestComponent, },

  {path: 'etapes/:test_id', component: ListEtapeComponent, },

  {path: 'casTests/:senarioId', component: ListCasTestComponent,},

  {path: 'executions/:test_id', component: ListExecutionComponent, },

  {path: 'motsCles', component: ListMotsCleComponent, },
  {path: 'campagnes', component: ListCampagneComponent, },
  {path: 'platforms', component: ListPlatformComponent, },
  {path: 'builds', component: ListBuildComponent, },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }