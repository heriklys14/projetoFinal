import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(url: string): Observable<Array<any>>
  {
    return this.http.get<Array<any>>(url);
  }

  public get(url: string, codigo: string): Observable<any>
  {
    return this.http.get<any>(url + codigo);
  }

  public post(url: string, model: any): Observable<any>
  {
    return this.http.post<any>(url, model);
  }

  public put(url: string, model: any): Observable<any>
  {
    return this.http.put<any>(url + model.codigo, model);
  }

  public delete(url: string, codigo: string): Observable<any>
  {
    return this.http.delete<any>(url + codigo);
  }
}
