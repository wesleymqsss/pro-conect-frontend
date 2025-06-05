import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { Observable } from "rxjs";
import { IProvaP } from "../interface/avaliacao";

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoAlunoService {
  private url = `${environment.api_url}/aluno`

  constructor(private http: HttpClient) { }

  getProvaDetalhe(id: number): Observable<IProvaP> {
    return this.http.get<IProvaP>(`${this.url}/provas/${id}`);
  }

  postRespostaAvaliacaoAluno(prova: any): Observable<any> {
    return this.http.post<any>(`${this.url}/respostas`, prova);
  }
}
