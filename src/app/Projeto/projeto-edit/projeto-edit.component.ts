import { ProjetoService } from './../projeto.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PoBreadcrumb } from '@po-ui/ng-components'

import { ToastrService } from 'ngx-toastr'
import { ComponentBase } from 'src/app/base/Component/base-component'
import { Projeto } from 'src/app/Models/Projeto'
import { BaseEditComponent } from 'src/app/Shared/Component/base-edit.component'

@Component({
  selector: 'app-projeto-edit',
  templateUrl: './projeto-edit.component.html',
  styleUrls: ['./projeto-edit.component.css'],
})
export class ProjetoEditComponent extends BaseEditComponent<Projeto>
  implements ComponentBase, OnInit {
  constructor(
    protected toastr: ToastrService,
    protected router: Router,
    protected route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected projetoService: ProjetoService,
  ) {
    super(toastr, router, route, projetoService)
  }

  public formulario: FormGroup

  public readonly breadCrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Visualização de Projetos', link: '/projetos' },
      { label: this.getTitle() },
    ],
  }

  ngOnInit(): void {
    super.ngOnInit()
  }

  protected IniciaFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
      descricao: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      tarefas: [null],
    })
  }

  public getTitle(): string {
    return 'Edição de Projeto'
  }

  public onSubmit(): void {
    super.OnSubmit()
  }

  Alteracao(): void {
    this.teveAlteracao = true
  }

  canDeactivate(): boolean {
    return !this.teveAlteracao
  }
}
