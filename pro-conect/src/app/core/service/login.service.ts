import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserLogin } from '../interface/userLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.api_url}/login/`
  private currentUserSubject = new BehaviorSubject<UserLogin | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  public get currentUserValue(): UserLogin | null {
    return this.currentUserSubject.value;
  }
  getUserLogin(username: string, password: string): Observable<UserLogin> {
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<UserLogin>(`${this.url}find`, { params })
  }

  getUserId(id: number): Observable<UserLogin> {
    return this.http.get<UserLogin>(`${this.url + id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.url + id}`, user)
  }

  getUserLoginNew(username: string, password: string): Observable<UserLogin> {
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<UserLogin>(`${this.url}find`, { params }).pipe( 
      tap((userLoginResponse: UserLogin) => {
        if (userLoginResponse && userLoginResponse.user) {

          this.currentUserSubject.next(userLoginResponse);
          this.isLoggedInSubject.next(true);

        } else {
          
          this.currentUserSubject.next(null);
          this.isLoggedInSubject.next(false);
          console.warn('Resposta do login recebida, mas não continha a propriedade "user" esperada ou era nula:', userLoginResponse);
        }
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    console.log('Usuário deslogado.');
  }

}
