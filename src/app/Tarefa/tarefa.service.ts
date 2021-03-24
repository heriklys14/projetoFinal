import { Injectable } from '@angular/core'
import { ModelServiceService } from '../Services/Base/model-service.service'
import { DataAccessService } from '../Services/dataAccess/data-access.service'

@Injectable({
  providedIn: 'root',
})
export class TarefaService extends ModelServiceService {
  constructor(protected dataAccess: DataAccessService) {
    super(dataAccess)
  }

  protected GetApiUrl(): string {
    return 'https://localhost:44350/api/tarefas/'
  }

  protected GetNomeRota(): string {
    return 'tarefas'
  }
}
