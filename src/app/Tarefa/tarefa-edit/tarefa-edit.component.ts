import { TarefaService } from './../tarefa.service'
import { ProjetoService } from './../../Projeto/projeto.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PoBreadcrumb, PoSelectOption } from '@po-ui/ng-components'

import { ToastrService } from 'ngx-toastr'
import { ComponentBase } from 'src/app/base/Component/base-component'
import { Projeto } from 'src/app/Models/Projeto'
import { Tarefa } from 'src/app/Models/Tarefa'
import { BaseEditComponent } from 'src/app/Shared/Component/base-edit.component'

@Component({
  selector: 'app-tarefa-edit',
  templateUrl: './tarefa-edit.component.html',
  styleUrls: ['./tarefa-edit.component.css'],
})
export class TarefaEditComponent extends BaseEditComponent<Tarefa>
  implements ComponentBase, OnInit {
  constructor(
    protected toastr: ToastrService,
    protected router: Router,
    protected formBuilder: FormBuilder,
    protected route: ActivatedRoute,
    protected projetoService: ProjetoService,
    protected service: TarefaService,
  ) {
    super(toastr, router, route, service)
  }

  public formulario: FormGroup
  public listProjetos = new Array<Projeto>()
  public projetoSelectOptions: Array<Projeto> = []
  public prioridadeSelectOptions: Array<PoSelectOption> = null
  public Projeto: Projeto

  public readonly breadCrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Visualização de Tarefas', link: '/tarefas' },
      { label: this.getTitle() },
    ],
  }

  ngOnInit(): void {
    super.ngOnInit()
    this.GetProjeto()
  }

  protected IniciaFormulario() {
    this.GetListaProjetos()

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
  }

  public getTitle(): string {
    return 'Edição de Tarefa'
  }

  public onSubmit(): void {
    super.OnSubmit()
  }

  async GetListaProjetos() {
    this.projetoService.getAll().subscribe(
      async (objetos) => {
        await objetos.map((x: Projeto) =>
          this.projetoSelectOptions.push(new Projeto(x.codigo, x.descricao)),
        )
      },
      (error) => console.log(error),
    )
  }

  async GetProjeto() {
    this.projetoService
      .get((this.formulario.value as Tarefa).projetoId)
      .subscribe(
        async (x: Projeto) =>
          await (this.Projeto = new Projeto(x.codigo, x.descricao)),
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
