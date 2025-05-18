import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../interface/userLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.api_url}/login`
  
  constructor(private http : HttpClient) { }

  getUserLogin(username: string, password: string ): Observable<UserLogin>{
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<UserLogin>(`${this.url}/find`, {params})
  }
}
