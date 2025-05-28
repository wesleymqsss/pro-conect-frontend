import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';
import { AlunoService } from '../../core/service/aluno.service';
import { AlunoListResponse } from '../../core/types/aluno-list-response.type';
import { CardDashboardService } from '../../core/service/card-dashboard.service';
import { CardDashboardListResponse } from '../../core/types/card-dashboard-list-response.type';
import { DisciplinaListResponse } from '../../core/types/disciplina-list-response.type';
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
  cardsProf!: CardDashboardListResponse;
  cardsAlun!: CardDashboardListResponse;
  disciplinas!: DisciplinaListResponse;
  isProfessor!: boolean;
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
    this.getCardsDashboardProf();
    this.getCardsDashboardAlun();
    this.getDiscipline();
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

  getCardsDashboardProf() {
    this._cardDashboardService.getCardsDashboard().subscribe((cardsResponse) => {
      this.cardsProf = cardsResponse;
    })
  }

  getCardsDashboardAlun() {
    this.cardsAlun = [
      {
        tipo: 'Total de Tarefas',
        value: 10
      },
      {
        tipo: 'Tarefas Realizadas',
        value: 8
      },
      {
        tipo: 'Provas Realizadas',
        value: 2
      },
      {
        tipo: 'Provas Pendentes',
        value: 2
      },
    ]
  }

  getDiscipline() {
    this.disciplinas = [
      {
        nomeDisciplina: 'Banco de Dados',
        professor: 'João Pimentel',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        sala: 'LAB 104',
        situacao: 'Cursando'
      },
      {
        nomeDisciplina: 'Programação WEB',
        professor: 'João Evangelista',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        sala: 'LAB 109',
        situacao: 'Cursando'
      },
      {
        nomeDisciplina: 'Programação Mobile',
        professor: 'João Pimentel',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        sala: 'LAB 106',
        situacao: 'Cursando'
      },
      {
        nomeDisciplina: 'Programação Orientada a Objetos',
        professor: 'João Evagelista',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        sala: 'LAB 201',
        situacao: 'Concluída'
      },

    ]
  }
}
