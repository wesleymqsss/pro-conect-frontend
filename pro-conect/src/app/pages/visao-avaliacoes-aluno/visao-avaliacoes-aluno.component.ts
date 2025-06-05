import { Component } from '@angular/core';
import { UserLogin } from '../../core/interface/userLogin';
import { firstValueFrom, Subscription } from 'rxjs';
import { LoginService } from '../../core/service/login.service';
import { ActivatedRoute } from '@angular/router';
import { AvaliacaoAlunoService } from '../../core/service/avaliacao-aluno.service';
import { IProvaDetalhes } from '../../core/interface/avaliacao';
import { AvaliacaoAlunoListResponse } from '../../core/types/avaliacao-aluno-list-response.type';
import { AvaliacaoService } from '../../core/service/avaliacao.service';


@Component({
  selector: 'app-visao-avaliacoes-aluno',
  standalone: false,
  templateUrl: './visao-avaliacoes-aluno.component.html',
  styleUrl: './visao-avaliacoes-aluno.component.scss'
})
export class VisaoAvaliacoesAlunoComponent {
  idProfessor!: number;
  prova!: AvaliacaoAlunoListResponse;
  isLoggedIn: boolean = false;
  idUser: number | undefined;
  currentUser: UserLogin | null = null;
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;


  constructor(
    private _loginService: LoginService,
    private _router: ActivatedRoute,
    private _avaliacaoAlunoService: AvaliacaoService
  ) { }

  ngOnInit(): void {
    this.getUserLogin();
    this.getAvaliacao();
    // this.receberIdProfessor();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  getUserLogin() {
    this.userSubscription = this._loginService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.idUser = user?.user.id;
    });

    this.loginStatusSubscription = this._loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  async getAvaliacao() {
    const id = await this.receberIdProfessor();

    this._avaliacaoAlunoService.getAvaliacaoProfessor(id).subscribe((detalheProva) => {
      this.prova = detalheProva;
    });
  }

  async receberIdProfessor(): Promise<number> {
    const params = await firstValueFrom(this._router.queryParams);
    return +params['idProfessor'];
  }
}
