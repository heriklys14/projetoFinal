import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjetoEditComponent } from './Projeto/projeto-edit/projeto-edit.component';
import { ProjetoViewComponent } from './Projeto/projeto-view/projeto-view.component';
import { ToastrModule } from 'ngx-toastr';
import { TarefaViewComponent } from './Tarefa/tarefa-view/tarefa-view.component';
import { TarefaEditComponent } from './Tarefa/tarefa-edit/tarefa-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/Guard/auth-guard.service';
import { ProjetoEditResolveService } from './Services/Guard/projeto-edit-resolve.service';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { DataAccessService } from './Services/dataAccess/data-access.service';
import { ProjetoService } from './Projeto/projeto.service';
import { TarefaService } from './Tarefa/tarefa.service';

@NgModule({
  declarations: [
    AppComponent,
    ProjetoEditComponent,
    ProjetoViewComponent,
    TarefaViewComponent,
    TarefaEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), PoModule, RouterModule.forRoot([]), // ToastrModule added
  ],
  providers: [
    AuthGuardService,
    ProjetoEditResolveService,
    DataAccessService,
    ProjetoService,
    TarefaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
