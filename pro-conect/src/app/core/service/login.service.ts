import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserLogin } from '../interface/userLogin';

const USER_STORAGE_KEY = 'currentUserApp';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.api_url}/login/`
  private currentUserSubject = new BehaviorSubject<UserLogin | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const user: UserLogin = JSON.parse(storedUser);
        if (user && user.user) {
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
        } else {
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Erro ao parsear usuário do localStorage', error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }

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
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userLoginResponse));

        } else {
          this.currentUserSubject.next(null);
          this.isLoggedInSubject.next(false);
          localStorage.removeItem(USER_STORAGE_KEY);
          console.warn('Resposta do login recebida, mas não continha a propriedade "user" esperada ou era nula:', userLoginResponse);
        }
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    localStorage.removeItem(USER_STORAGE_KEY);
    console.log('Usuário deslogado.');
    
  }

}
