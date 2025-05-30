import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { DadosGraphProfListResponse } from '../types/dados-graph-prof-list.type';
import { DisciplinaListResponse } from '../types/disciplina-list-response.type';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
  private url = `${environment.api_url}/dashboard/disciplinas-aluno`

  constructor(private http: HttpClient) { }

  getDiscipline(): Observable<DisciplinaListResponse> {
    return this.http.get<DisciplinaListResponse>(`${this.url}`);
  }
}
