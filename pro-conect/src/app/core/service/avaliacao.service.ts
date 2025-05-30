import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { IProvaDetalhes } from '../interface/avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private url = `${environment.api_url}/provas`
  constructor(private http: HttpClient) { }

  createAvaliacao(avaliacao: any): Observable<any>{
    return this.http.post<any>(`${this.url}`, avaliacao);
  }

  getAvaliacaoProfessor(idProfessor: number): Observable<IProvaDetalhes[]>{
    return this.http.get<IProvaDetalhes[]>(`${this.url}/professor/${idProfessor}`);
  }
  
  deleteAvaliacao(idAvaliacao: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${idAvaliacao}`)
  }
}
