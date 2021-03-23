import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PoBreadcrumb, PoSelectOption } from '@po-ui/ng-components'

import { ToastrService } from 'ngx-toastr'
import { ComponentBase } from 'src/app/base/Component/base-component'
import { Projeto } from 'src/app/Models/Projeto'
import { Tarefa } from 'src/app/Models/Tarefa'

@Component({
  selector: 'app-tarefa-edit',
  templateUrl: './tarefa-edit.component.html',
  styleUrls: ['./tarefa-edit.component.css'],
})
export class TarefaEditComponent implements ComponentBase, OnInit {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  private apiUrl = 'https://localhost:44350/api/tarefas'
  private apiUrlProjetos = 'https://localhost:44350/api/projetos'
  public formulario: FormGroup
  private isNew = true
  private teveAlteracao = false
  public listProjetos = new Array<Projeto>()
  public projetoSelectOptions = null
  public prioridadeSelectOptions: Array<PoSelectOption> = null

  public readonly breadCrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Visualização de Tarefas', link: '/tarefas' },
      { label: this.getTitle() },
    ],
  }

  ngOnInit(): void {
    this.GetListaProjetos()
    console.log(this.listProjetos)

    this.projetoSelectOptions = this.listProjetos
    this.prioridadeSelectOptions = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
    ]

    this.formulario = this.formBuilder.group({
      codigo: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
      titulo: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      data: [null, [Validators.required]],
      prioridade: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      projetoId: [null, [Validators.required]],
    })

    this.GetTarefa()
  }

  public getTitle(): string {
    return 'Edição de Tarefa'
  }

  public onSubmit(): void {
    if (this.formulario.valid) {
      if (!this.isNew) {
        this.Alterar()
      } else {
        this.Incluir()
      }
    } else {
      const propriedades = Object.keys(this.formulario.controls)
      propriedades.forEach((propriedade) => {
        const controle = this.formulario.get(propriedade)
        if (!controle.valid) {
          controle.markAsTouched()
        }
      })
    }
  }

  public Incluir(): void {
    this.http.post<Tarefa>(this.apiUrl, this.formulario.value).subscribe(
      (registro) => {
        this.toastr.success(`Tarefa ${registro.codigo} criada com sucesso.`)
        this.router.navigate(['tarefas'])
      },
      (error) => {
        console.log(error)
      },
    )
  }

  public Alterar(): void {
    this.http
      .put<Tarefa>(
        this.apiUrl + `/${this.formulario.value.codigo}`,
        this.formulario.value,
      )
      .subscribe(
        (registro) => {
          this.toastr.success(`Tarefa ${registro.codigo} alterado com sucesso.`)
          this.router.navigate(['tarefas'])
        },
        (error) => {
          console.log(error)
        },
      )
  }

  public GetTarefa(): void {
    this.route.data.subscribe((info: { registro: Tarefa }) => {
      if (info.registro) {
        this.isNew = false
        this.formulario.setValue(info.registro)
      }
    })
  }

  public GetListaProjetos(): void {
    this.http.get<Array<Projeto>>(this.apiUrlProjetos).subscribe(
      (objetos) => {
        this.listProjetos = objetos.map((x) => x as Projeto)
      },
      (error) => console.log(error),
    )
  }

  Alteracao(): void {
    this.teveAlteracao = true
  }

  canDeactivate(): boolean {
    return !this.teveAlteracao
  }
}
