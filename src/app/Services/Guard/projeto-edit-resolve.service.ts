import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { Projeto } from 'src/app/Models/Projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoEditResolveService implements Resolve<Projeto> {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:44350/api/projetos';

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
          Projeto | Observable<Projeto> | Promise<Projeto> {


    const projetoId: string = route.params.id;
    return this.http.get<Projeto>(this.apiUrl + `/${projetoId}`);
  }
}
