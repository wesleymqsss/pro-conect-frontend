import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';
import { AlunoService } from '../../core/service/aluno.service';
import { AlunoListResponse } from '../../core/types/aluno-list-response.type';
import { CardDashboardService } from '../../core/service/card-dashboard.service';
import { CardDashboardListResponse } from '../../core/types/card-dashboard-list-response.type';

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

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _loginService: LoginService,
    private readonly _alunoService: AlunoService,
    private readonly _cardDashboardService: CardDashboardService
  ) { }

  ngOnInit() {
    this.idUser();
    this.getStudents();
    this.getCardsDashboard();
  }

  idUser() {
    this.userId = this._route.snapshot.paramMap.get('id')!;
    const userIdInt = parseInt(this.userId);
    this.getUser(userIdInt);
  }

  getUser(id: number) {
    this._loginService.getUserId(id).subscribe({
      next: (responseUserLogin) => {
        this.userLogin = responseUserLogin;
      }
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
