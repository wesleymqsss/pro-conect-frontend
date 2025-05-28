import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private url = `${environment.api_url}/provas`
  constructor(private http: HttpClient) { }

  createAvaliacao(avaliacao: any): Observable<any>{
    return this.http.post<any>(`${this.url}`, avaliacao);
  }
}
