import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';

import { ToastrService } from 'ngx-toastr';
import { ComponentBase } from 'src/app/base/Component/base-component';
import { Projeto } from 'src/app/Models/Projeto';

@Component({
  selector: 'app-projeto-edit',
  templateUrl: './projeto-edit.component.html',
  styleUrls: ['./projeto-edit.component.css']
})

export class ProjetoEditComponent implements ComponentBase, OnInit {

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }    
  
  private apiUrl: string = 'https://localhost:44350/api/projetos';
  public formulario : FormGroup;
  private isNew: boolean = true;
  private teveAlteracao: boolean = false;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      descricao: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      tarefas: [null]
    });

    this.GetProjeto();
  }
  
  public readonly breadCrumb : PoBreadcrumb =
  {
    items: [
      { label: "Home", link: '/' },
      { label: "Visualização de Projetos", link:'/projetos'},
      { label: this.getTittle()},
    ]
  }

  public getTittle() : string 
  {
    return 'Edição de Projeto';
  }

  public onSubmit() : void
  {    
    console.log(this.formulario.value);
    if(this.formulario.valid)
    {
      if(!this.isNew)
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

  public Alterar() {    
    this.http.put<Projeto>(this.apiUrl + `/${this.formulario.value.codigo}`, this.formulario.value)
      .subscribe(registro => {
        this.toastr.success(`Projeto ${registro.codigo} alterado com sucesso.`);
        this.router.navigate(['projetos']);
      },
        error => {
          console.log(error);
        });
  }

  public Incluir() {
    this.http.post<Projeto>(this.apiUrl, this.formulario.value)
      .subscribe(registro => {
        this.toastr.success(`Projeto ${registro.codigo} criado com sucesso.`);
        this.router.navigate(['projetos']);
      },
        error => {
          console.log(error);
        });
  }

  public GetProjeto(){
     this.route.data.subscribe(
      (info: { registro: Projeto}) => {
        if(info.registro)
        {
          this.isNew = false;
          this.formulario.setValue(info.registro);
        }
      });
  }

  Alteracao(){
    this.teveAlteracao = true;
    console.log("Alteracao: " + this.teveAlteracao);
  }

  canDeactivate(): boolean {
      return !this.teveAlteracao;
  }
}
