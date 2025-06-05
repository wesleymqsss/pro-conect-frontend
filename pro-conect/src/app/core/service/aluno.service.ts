import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { AlunoResponse } from '../interface/alunoResponse';
import { AlunoListResponse } from '../types/aluno-list-response.type';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private url = `${environment.api_url}/alunos`

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<AlunoListResponse> {
    return this.http.get<AlunoListResponse>(`${this.url}`);
  }

  getPorTurma(turma: string): Observable<AlunoListResponse> {
    return this.http.get<AlunoListResponse>(`${this.url}/${turma}`);
  }

}
