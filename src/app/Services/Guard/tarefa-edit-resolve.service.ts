import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

import { Tarefa } from "src/app/Models/Tarefa";

@Injectable({
    providedIn: 'root'
})
export class TarefaEditResolveService implements Resolve<Tarefa>{

    constructor(private http: HttpClient) { }

    private apiUrl: string = 'https://localhost:44350/api/tarefas/';

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Tarefa | Observable<Tarefa> | Promise<Tarefa> {


        const tarefaId: string = route.params.id;
        return this.http.get<Tarefa>(this.apiUrl + `/${tarefaId}`);
    }
}