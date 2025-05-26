import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserLogin } from '../../core/interface/userLogin';
import { LoginService } from '../../core/service/login.service';

@Component({
  selector: 'app-nova-avaliacao',
  standalone: false,
  templateUrl: './nova-avaliacao.component.html',
  styleUrl: './nova-avaliacao.component.scss'
})
export class NovaAvaliacaoComponent {
  currentUser: UserLogin | null = null;
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this.userSubscription = this._loginService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log( 'sou o usuario logado na avaliacao', this.currentUser)
    });

    this.loginStatusSubscription = this._loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

}