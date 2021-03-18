import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ComponentBase } from 'src/app/base/Component/base-component';
import { Projeto } from 'src/app/Models/Projeto';
import { Tarefa } from 'src/app/Models/Tarefa';

@Component({
  selector: 'app-tarefa-edit',
  templateUrl: './tarefa-edit.component.html',
  styleUrls: ['./tarefa-edit.component.css']
})

export class TarefaEditComponent implements ComponentBase, OnInit {

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  private apiUrl: string = 'https://localhost:44350/api/tarefas';
  private apiUrlProjetos: string = 'https://localhost:44350/api/projetos';
  public formulario : FormGroup;
  private teveAlteracao: boolean = false;
  public listProjetos = new Array<Projeto>();
  
  //reactiveForm
  ngOnInit(): void {
    this.GetListaProjetos();
    
    this.formulario = this.formBuilder.group({
      codigo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      titulo: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      data: [null, [Validators.required]],
      prioridade: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      projetoId: [null, [Validators.required]],
    });
  }

  public onSubmit() : void
  {        
    const id = this.route.snapshot.paramMap.get('id');

    if(this.formulario.valid)
    {
      if(id != null)
        this.Alterar();
      else
        this.Incluir();
    }
    else
    {
      let propriedades = Object.keys(this.formulario.controls);
      propriedades.forEach(propriedade => {
        let controle = this.formulario.get(propriedade);
        if(!controle.valid)
        {
          controle.markAsTouched();
        }
      });
    }
  }  

  public Incluir() {
    console.log("Incluir");
      if (!this.formulario.value.codigo || !this.formulario.value.descricao) {
        this.toastr.error(`Código e descrição devem ser preenchidos.`);
        return;
      }

      this.http.post<Tarefa>(this.apiUrl, this.formulario.value)
        .subscribe(registro => {
          this.toastr.success(`Tarefa ${registro.codigo} criada com sucesso.`);
          this.router.navigate(['tarefas']);
        },
          error => {
            console.log(error);
          });
  }

  public Alterar() {  
    console.log("Alterar");
      if (!this.formulario.value.codigo || !this.formulario.value.descricao) {
        this.toastr.error(`Código e descrição devem ser preenchidos.`);
        return;
      } 

      this.http.put<Tarefa>(this.apiUrl + `/${this.formulario.value.codigo}`, this.formulario.value)
      .subscribe(registro => {
        this.toastr.success(`Tarefa ${registro.codigo} alterado com sucesso.`);
        this.router.navigate(['tarefas']);
      },
        error => {
          console.log(error);
        });
  }

  public GetTarefa() {
    const tarefaId = this.route.snapshot.paramMap.get('id');

    this.http.get<Tarefa>(this.apiUrl + `/${tarefaId}`)
      .subscribe(registro => {
        registro = new Tarefa(registro.codigo, registro.titulo, registro.data,
          registro.prioridade, registro.descricao, registro.projetoId);
      },
        error => console.log(error)
      );
  }

  public GetListaProjetos() {
    this.http.get<Projeto[]>(this.apiUrlProjetos)
      .subscribe(objetos => {
        this.listProjetos = objetos.map(x => Object.assign(new Projeto(null, null), x));
      },
        error => console.log(error)
      );
  }

  Alteracao(){
    this.teveAlteracao = true;
    console.log("Alteracao: " + this.teveAlteracao);
  }

  canDeactivate(): boolean {
    return !this.teveAlteracao;
  }
}