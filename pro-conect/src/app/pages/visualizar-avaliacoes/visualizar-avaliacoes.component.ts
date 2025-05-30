import { Component } from '@angular/core';
import { UserLogin } from '../../core/interface/userLogin';
import { Subscription } from 'rxjs';
import { LoginService } from '../../core/service/login.service';
import { AvaliacaoService } from '../../core/service/avaliacao.service';
import { IProvaDetalhes } from '../../core/interface/avaliacao';
import { ConfirmationService } from 'primeng/api';
import { SnackbarService } from '../../core/service/snackbar.service';

@Component({
  selector: 'app-visualizar-avaliacoes',
  standalone: false,
  templateUrl: './visualizar-avaliacoes.component.html',
  styleUrl: './visualizar-avaliacoes.component.scss'
})
export class VisualizarAvaliacoesComponent {

  avaliacaoProfessor: IProvaDetalhes[] = [];
  currentUser: UserLogin | null = null;
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;

  constructor(
    private _loginService: LoginService,
    private _avaliacaoService: AvaliacaoService,
    private confirmationService: ConfirmationService,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getUserLogin();
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
      this.getAvaliacaoProfessor()
    });

    this.loginStatusSubscription = this._loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      console.log('logado: ', this.isLoggedIn)
    });
  }

  getAvaliacaoProfessor() {
    if (this.currentUser) {
      const id = this.currentUser.user.id
      this._avaliacaoService.getAvaliacaoProfessor(id).subscribe({
        next: (avaliacaoProfessorResponse) => {
          this.avaliacaoProfessor = avaliacaoProfessorResponse;
          console.log(this.avaliacaoProfessor);
        }
      });
    }
  }

  conversaoMateria(idMateria: number): string {
    switch (idMateria) {
      case 1:
        return 'Banco de Dados';
      case 2:
        return 'Programação WEB';
      case 3:
        return 'Engenharia de Software';
      case 4:
        return 'Redes de Computadores';
      case 5:
        return 'Sistemas Operacionais';
      default:
        return 'Desconhecido';
    }
  }

  deleteProduct(idMateria: number, descricao: string) {
    this.confirmationService.confirm({
      message: 'Deseja excluir a avaliação: ' + descricao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._avaliacaoService.deleteAvaliacao(idMateria).subscribe({
          next: () => {
            this._snackbarService.showSuccess('Avaliação excluida com sucesso!!!')
          }
        });
      }
    });
  }

  editProduct(arg0: any) {
    throw new Error('Method not implemented.');
  }

}
