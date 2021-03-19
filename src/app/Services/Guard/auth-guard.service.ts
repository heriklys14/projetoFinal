import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ComponentBase } from 'src/app/base/Component/base-component';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService
       implements CanActivate, CanDeactivate<ComponentBase> {

  constructor( private toastr: ToastrService,
               private router: Router) { }

  private itemKey = 'authUser';

  // guarda de rota
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
              boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const authUser = window.localStorage.getItem(this.itemKey);

    if (!authUser)
    {
      this.toastr.error('Não pode camarada');
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  canDeactivate(component: ComponentBase,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot):
                boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (!component.canDeactivate()){
      return confirm('Certeza que deseja sair da pagina?');
    }
    return component.canDeactivate();
  }
}
