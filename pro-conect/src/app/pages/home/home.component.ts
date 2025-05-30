import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';
import { AlunoService } from '../../core/service/aluno.service';
import { AlunoListResponse } from '../../core/types/aluno-list-response.type';
import { CardDashboardProfService } from '../../core/service/card-dashboard-prof.service';
import { CardDashboardListResponse } from '../../core/types/card-dashboard-list-response.type';
import { DisciplinaListResponse } from '../../core/types/disciplina-list-response.type';
import { Subscription } from 'rxjs';
import { GraphProfService } from '../../core/service/graph-prof.service';
import { DadosGraphProfListResponse } from '../../core/types/dados-graph-prof-list.type';
import { TurmaService } from '../../core/service/turma.service';
import { TurmaListResponse } from '../../core/types/turma-list-response.type';
import { DisciplineService } from '../../core/service/discipline.service';
import { DadosGraphNoteListResponse } from '../../core/types/dados-graph-note-list-response.type';
import { GraphNoteService } from '../../core/service/graph-note.service';
import { CardDashboardAlunService } from '../../core/service/card-dashboard-alun.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;

  userId!: string;
  userLogin!: UserLogin;
  alunos!: AlunoListResponse;
  cardsProf!: CardDashboardListResponse;
  cardsAlun!: CardDashboardListResponse;
  disciplinas!: DisciplinaListResponse;
  turmas!: TurmaListResponse;
  dataGraphProf!: DadosGraphProfListResponse;
  dataGraphAlun!: DadosGraphNoteListResponse;
  isProfessor!: boolean;
  currentUser: UserLogin | null = null;
  isLoggedIn: boolean = false;


  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _loginService: LoginService,
    private readonly _alunoService: AlunoService,
    private readonly _cardDashboardService: CardDashboardProfService,
    private readonly _cardDashboardAlunService: CardDashboardAlunService,
    private readonly _graphProfService: GraphProfService,
    private readonly _graphAlunService: GraphNoteService,
    private readonly _turmaService: TurmaService,
    private readonly _disciplineService: DisciplineService
  ) { }

  ngOnInit() {
    this.getTarefas();
    this.getCardsDashboardProf();
    this.getCardsDashboardAlun();
    this.getDataGraphProf();
    this.getDataGraphAlun();
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
    });

    this.loginStatusSubscription = this._loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  getStudentsByClass(turma: string) {
    this._alunoService.getPorTurma(turma).subscribe((alunoResponse) => {
      this.alunos = alunoResponse;
    })
  }

  getDataGraphProf() {
    this._graphProfService.getDataGraph().subscribe((dataGraph) => {
      this.dataGraphProf = dataGraph;
    })
  }

  getDataGraphAlun() {
    this._graphAlunService.getDataGraph().subscribe((dataGraph) => {
      this.dataGraphAlun = dataGraph;
      console.log("gráfico aluno", this.dataGraphAlun);

    });
  }

  getTarefas() {
    this._turmaService.getTurmas().subscribe((tarefaResponse) => {
      this.turmas = tarefaResponse;
    })
  }

  getCardsDashboardProf() {
    this._cardDashboardService.getCardsDashboard().subscribe((cardsResponse) => {
      this.cardsProf = cardsResponse;
    })
  }

  getCardsDashboardAlun() {
    this._cardDashboardAlunService.getCardsDashboard().subscribe((dataCard) => {
      this.cardsAlun = dataCard;
      console.log('cards alun', this.cardsAlun);

    })
  }

  getDiscipline() {
    this._disciplineService.getDiscipline().subscribe((disciplineResponse) => {
      this.disciplinas = disciplineResponse;
      console.log('disciplinas', this.disciplinas);

    });
  }
}
