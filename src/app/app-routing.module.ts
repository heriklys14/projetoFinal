import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetoEditComponent } from './Projeto/projeto-edit/projeto-edit.component';
import { ProjetoViewComponent } from './Projeto/projeto-view/projeto-view.component';
import { TarefaViewComponent } from './Tarefa/tarefa-view/tarefa-view.component';
import { TarefaEditComponent } from './Tarefa/tarefa-edit/tarefa-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/Guard/auth-guard.service';
import { ProjetoEditResolveService } from './Services/Guard/projeto-edit-resolve.service';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {     
    path: 'projetos', 
    component: ProjetoViewComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'projetos/new',     
    component: ProjetoEditComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [AuthGuardService]
  },
  { 
    path: 'projetos/edit/:id', 
    component: ProjetoEditComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [AuthGuardService],
    resolve: { registro: ProjetoEditResolveService }
  },
  { 
    path: 'tarefas', 
    component: TarefaViewComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'tarefas/new', 
    component: TarefaEditComponent,
    canActivate: [AuthGuardService],    
    canDeactivate: [AuthGuardService]
  },
  { 
    path: 'tarefas/edit/:id', 
    component: TarefaEditComponent,
    canActivate: [AuthGuardService],    
    canDeactivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
