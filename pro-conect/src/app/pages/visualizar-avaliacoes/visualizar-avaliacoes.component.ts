import { Component } from '@angular/core';
import { UserLogin } from '../../core/interface/userLogin';
import { Subscription } from 'rxjs';
import { LoginService } from '../../core/service/login.service';
import { AvaliacaoService } from '../../core/service/avaliacao.service';

@Component({
  selector: 'app-visualizar-avaliacoes',
  standalone: false,
  templateUrl: './visualizar-avaliacoes.component.html',
  styleUrl: './visualizar-avaliacoes.component.scss'
})
export class VisualizarAvaliacoesComponent {
  currentUser: UserLogin | null = null;
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;

  constructor(
    private _loginService: LoginService,
    private _avaliacaoService: AvaliacaoService
  ) { }

  ngOnInit(): void {
    this.getUserLogin();
  }

  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }

    if( this.loginStatusSubscription){
      this.loginStatusSubscription.unsubscribe();
    }
  }

  getUserLogin(){
    this.userSubscription = this._loginService.currentUser$.subscribe( user => {
      this.currentUser = user;
    });

    this.loginStatusSubscription = this._loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      console.log('logado: ', this.isLoggedIn)
    })
  }
}
