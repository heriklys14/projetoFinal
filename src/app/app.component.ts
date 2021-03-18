import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router : Router) {    
    
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/', icon:'po-icon po-icon-home', shortLabel:'Home' },
    { label: 'Projetos', link: '/projetos', icon:'po-icon po-icon-layers', shortLabel: 'Projetos' }, 
    { label: 'Tarefas', link: '/tarefas', icon: 'po-icon po-icon-like', shortLabel: 'Tarefas' },
    { label: 'Logout', action: this.logout.bind(this), icon:'po-icon po-icon-exit', shortLabel: 'Logout' }
  ];
  
  private itemKey : string = "authUser";

  private logout() {        
    window.localStorage.removeItem(this.itemKey);
    this.router.navigate(['login']);
  }

}
