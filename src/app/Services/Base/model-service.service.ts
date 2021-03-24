import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ModelBase } from 'src/app/Models/base/modelBase'
import { DataAccessService } from '../dataAccess/data-access.service'

@Injectable({
  providedIn: 'root',
})
export abstract class ModelServiceService {
  constructor(protected dataAccess: DataAccessService) {}

  public nomeRota: string = this.GetNomeRota()

  private url: string = this.GetApiUrl()

  public getAll(): Observable<Array<ModelBase>> {
    return this.dataAccess.getAll(this.url)
  }

  public get(codigo: string): Observable<ModelBase> {
    return this.dataAccess.get(this.url, codigo)
  }

  public post(model: ModelBase): Observable<ModelBase> {
    return this.dataAccess.post(this.url, model)
  }

  public put(model: ModelBase): Observable<ModelBase> {
    return this.dataAccess.put(this.url, model)
  }

  public delete(codigo: string): Observable<ModelBase> {
    return this.dataAccess.delete(this.url, codigo)
  }

  protected abstract GetApiUrl(): string
  protected abstract GetNomeRota(): string
}
