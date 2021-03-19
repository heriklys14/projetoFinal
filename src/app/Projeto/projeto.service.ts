import { Injectable } from '@angular/core';
import { ModelServiceService } from '../Services/Base/model-service.service';
import { DataAccessService } from '../Services/dataAccess/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService extends ModelServiceService {

  constructor(
    protected dataAccess: DataAccessService
  ) {
    super(dataAccess);
   }

   protected GetApiUrl(): string {
    return 'https://localhost:44350/api/projetos/';
  }
}
