import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  PoBreadcrumb,
  PoNotificationService,
  PoPageAction,
} from '@po-ui/ng-components'

import { Tarefa } from 'src/app/Models/Tarefa'
import { BaseViewComponent } from 'src/app/Shared/Component/base-view.component'
import { TarefaService } from '../tarefa.service'

@Component({
  selector: 'app-tarefa-view',
  templateUrl: './tarefa-view.component.html',
  styleUrls: ['./tarefa-view.component.css'],
})
export class TarefaViewComponent extends BaseViewComponent<Tarefa>
  implements OnInit {
  constructor(
    protected router: Router,
    protected poNotification: PoNotificationService,
    protected service: TarefaService,
  ) {
    super(router, poNotification, service)
  }

  ngOnInit(): void {
    super.ngOnInit()
  }

  protected GetActions(): PoPageAction[] {
    return [
      {
        label: 'Incluir',
        action: () => this.router.navigate(['tarefas', 'new']),
      },
    ]
  }

  protected GetBreadCrumb(): PoBreadcrumb {
    return {
      items: [
        { label: 'Home', link: '/' },
        { label: 'Visualização de Tarefas' },
      ],
    }
  }

  Editar(tarefa: Tarefa): void {
    this.router.navigate([`tarefas/edit/${tarefa.codigo}`])
  }
}
