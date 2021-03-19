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

  private apiUrl = 'https://localhost:44350/api/projetos/';
  public formulario: FormGroup;
  private isNew = true;
  private teveAlteracao = false;

  public readonly breadCrumb: PoBreadcrumb =
  {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Visualização de Projetos', link: '/projetos'},
      { label: this.getTittle()},
    ]
  };

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      descricao: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      tarefas: [null]
    });

    this.GetProjeto();
  }

  public getTittle(): string
  {
    return 'Edição de Projeto';
  }

  public onSubmit(): void
  {
    console.log(this.formulario.value);
    if (this.formulario.valid)
    {
      if (!this.isNew) {
        this.Alterar();
      }
      else {
        this.Incluir();
      }
    }
    else
    {
      const propriedades = Object.keys(this.formulario.controls);
      propriedades.forEach(propriedade => {
        const controle = this.formulario.get(propriedade);
        if (!controle.valid)
        {
          controle.markAsTouched();
        }
      });
    }
  }

  public Alterar(): void {
    this.http.put<Projeto>(this.apiUrl + `/${this.formulario.value.codigo}`, this.formulario.value)
      .subscribe(registro => {
        this.toastr.success(`Projeto ${registro.codigo} alterado com sucesso.`);
        this.router.navigate(['projetos']);
      },
        error => {
          console.log(error);
        });
  }

  public Incluir(): void {
    this.http.post<Projeto>(this.apiUrl, this.formulario.value)
      .subscribe(registro => {
        this.toastr.success(`Projeto ${registro.codigo} criado com sucesso.`);
        this.router.navigate(['projetos']);
      },
        error => {
          console.log(error);
        });
  }

  public GetProjeto(): void{
     this.route.data.subscribe(
      (info: { registro: Projeto}) => {
        if (info.registro)
        {
          this.isNew = false;
          this.formulario.setValue(info.registro);
        }
      });
  }

  Alteracao(): void{
    this.teveAlteracao = true;
  }

  canDeactivate(): boolean {
      return !this.teveAlteracao;
  }
}
