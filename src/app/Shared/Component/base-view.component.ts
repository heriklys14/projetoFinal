import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  PoBreadcrumb,
  PoNotificationService,
  PoPageAction,
  PoTableColumn,
} from '@po-ui/ng-components'
import { ModelBase } from 'src/app/Models/base/modelBase'
import { ModelServiceService } from 'src/app/Services/Base/model-service.service'

@Component({
  template: '',
})
export abstract class BaseViewComponent<T extends ModelBase> implements OnInit {
  constructor(
    protected router: Router,
    protected poNotification: PoNotificationService,
    protected service: ModelServiceService,
  ) {}

  public models = new Array<T>()

  public actions: Array<PoPageAction> = this.GetActions()

  public readonly breadCrumb: PoBreadcrumb = this.GetBreadCrumb()

  ngOnInit(): void {
    this.Read()
  }

  protected abstract GetActions(): PoPageAction[]

  protected abstract GetBreadCrumb(): PoBreadcrumb

  private Read(): void {
    this.service.getAll().subscribe(
      (objetos) => {
        this.models = objetos.map((x) => x as T)
      },
      (error) => console.log(error),
    )
  }

  public Excluir(model: T): void {
    this.service.delete(model.codigo).subscribe(
      (registro) => {
        this.poNotification.success(
          `Registro '${registro.codigo}' excluido com sucesso.`,
        )
        this.Read()
      },
      (error) => console.log(error),
    )
  }
}
