import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';

import { Projeto } from 'src/app/Models/Projeto';
import { BaseViewComponent } from 'src/app/Shared/Component/base-view.component';
import { ProjetoService } from '../projeto.service';

@Component({
  selector: 'app-projeto-view',
  templateUrl: './projeto-view.component.html',
  styleUrls: ['./projeto-view.component.css']
})

export class ProjetoViewComponent extends BaseViewComponent<Projeto> implements OnInit {

  constructor(protected router: Router,
              protected poNotification: PoNotificationService,
              protected service: ProjetoService)
              {
                super(router, poNotification, service);
              }

  public readonly colunasView: Array<PoTableColumn> = [
    { label: 'Código', property: 'codigo' },
    { label: 'Descrição', property: 'descricao' }
  ];

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected GetActions(): PoPageAction[] {
    return [
      {label: 'Incluir', action: () => this.router.navigate(['projetos', 'new'])},
      {label: 'Editar', action: this.editarRegistro.bind(this)},
      {label: 'Excluir', action: this.excluirRegistro.bind(this)}
    ];
  }

  protected GetBreadCrumb(): PoBreadcrumb {
    return  {
      items: [
        { label: 'Home', link: '/' },
        { label: 'Visualização de Projetos'}
      ]
    };
  }

  private editarRegistro(): void
  {
    const projetoSelecionado = this.getProjetoSelecionado();

    if (!projetoSelecionado) {
      this.poNotification.warning('Selecione um registro');
    }
    else {
      this.Editar(projetoSelecionado);
    }
  }

  private excluirRegistro(): void
  {
    const projetoSelecionado = this.getProjetoSelecionado();

    if (!projetoSelecionado) {
      this.poNotification.warning('Selecione um registro');
    }
    else {
      this.Excluir(projetoSelecionado);
    }
  }

  private getProjetoSelecionado(): Projeto
  {
    return this.models.find(x => x['$selected']);
  }

  public Incluir(): void {
    this.router.navigate(['projetos', 'new']);
  }

  public Editar(projeto: Projeto): void{
    this.router.navigate([`projetos/edit/${projeto.codigo}`]);
  }
}
