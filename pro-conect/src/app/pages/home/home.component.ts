import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';
import { AlunoService } from '../../core/service/aluno.service';
import { AlunoListResponse } from '../../core/types/aluno-list-response.type';
import { CardDashboardService } from '../../core/service/card-dashboard.service';
import { CardDashboardListResponse } from '../../core/types/card-dashboard-list-response.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userId!: string;
  userLogin!: UserLogin;
  alunos!: AlunoListResponse;
  cards!: CardDashboardListResponse;
  currentUser: UserLogin | null = null;
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _loginService: LoginService,
    private readonly _alunoService: AlunoService,
    private readonly _cardDashboardService: CardDashboardService
  ) { }

  ngOnInit() {
    this.getStudents();
    this.getCardsDashboard();
    this.getUser()

  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  getUser() {
    this.userSubscription = this._loginService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log('sou o usuario logado na HOME', this.currentUser)
    });

    this.loginStatusSubscription = this._loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  getStudents() {
    this._alunoService.getAlunos().subscribe((alunoResponse) => {
      this.alunos = alunoResponse;
    })
  }

  getCardsDashboard() {
    this._cardDashboardService.getCardsDashboard().subscribe((cardsResponse) => {
      this.cards = cardsResponse;
    })
  }

}
