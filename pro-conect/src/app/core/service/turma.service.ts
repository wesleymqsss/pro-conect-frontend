import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { TurmaListResponse } from '../types/turma-list-response.type';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private url = `${environment.api_url}/Alunos/View-de-turmas`

  constructor(private http: HttpClient) { }

  getTurmas(): Observable<TurmaListResponse> {
    return this.http.get<TurmaListResponse>(`${this.url}`);
  }

}
