import { Component } from '@angular/core';
import { UserLogin } from '../../core/interface/userLogin';
import { Subscription } from 'rxjs';
import { LoginService } from '../../core/service/login.service';
import { AvaliacaoService } from '../../core/service/avaliacao.service';
import { IOpcao, IProvaDetalhes, IProvaP, IQuestao } from '../../core/interface/avaliacao';
import { ConfirmationService } from 'primeng/api';
import { SnackbarService } from '../../core/service/snackbar.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-visualizar-avaliacoes',
  standalone: false,
  templateUrl: './visualizar-avaliacoes.component.html',
  styleUrl: './visualizar-avaliacoes.component.scss'
})
export class VisualizarAvaliacoesComponent {
  avaliacaoDialog: boolean = false;
  avaliacaoProfessor: IProvaDetalhes[] = [];
  currentUser: UserLogin | null = null;
  isLoggedIn: boolean = false;
  provaForm!: FormGroup;
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;

  constructor(
    private _loginService: LoginService,
    private _avaliacaoService: AvaliacaoService,
    private confirmationService: ConfirmationService,
    private _snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {
    this.provaForm = this.fb.group({
      id: [null],
      descricao: ['', Validators.required],
      dataProva: ['', Validators.required],
      materiaId: [null, Validators.required],
      professorId: [null, Validators.required],
      questoes: this.fb.array([])
    });
  }

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
            this._snackbarService.showSuccess('Avaliação excluida com sucesso!!!');

          }
        });
      }
    });
  }

 get questoes(): FormArray {
    return this.provaForm.get('questoes') as FormArray;
  }

  // Método para construir um FormGroup para uma questão
  private buildQuestaoForm(questao: IQuestao): FormGroup {
    return this.fb.group({
      texto: [questao.texto, Validators.required],
      valor: [questao.valor, [Validators.required, Validators.min(0.01)]],
      professorId: [questao.professorId, Validators.required],
      opcoes: this.buildOpcoesFormArray(questao.opcoes)
    });
  }

  
  private buildOpcoesFormArray(opcoes: IOpcao[]): FormArray<FormGroup> { 
  const formArray = this.fb.array<FormGroup>([]); 
  opcoes.forEach(opcao => {
    formArray.push(this.buildOpcaoForm(opcao));
  });
  return formArray;
}

  private buildOpcaoForm(opcao: IOpcao): FormGroup {
    return this.fb.group({
      rotulo: [opcao.rotulo, Validators.required],
      descricao: [opcao.descricao, Validators.required],
      correta: [opcao.correta]
    });
  }

  
  private populateForm(prova: IProvaP): void {
    this.provaForm.patchValue({
      id: prova.id, 
      descricao: prova.descricao,
      dataProva: prova.dataProva,
      materiaId: prova.materiaId,
      professorId: prova.professorId
    });

   
    this.questoes.clear();
    prova.questoes.forEach(questao => {
      this.questoes.push(this.buildQuestaoForm(questao));
    });
  }

  
  addQuestao(): void {
    const questaoForm = this.fb.group({
      texto: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      professorId: [null, Validators.required],
      opcoes: this.fb.array([])
    });
    this.questoes.push(questaoForm);
  }

  removeQuestao(index: number): void {
    this.questoes.removeAt(index);
  }

  getOpcoes(questaoIndex: number): FormArray {
    return this.questoes.at(questaoIndex).get('opcoes') as FormArray;
  }

  addOpcao(questaoIndex: number): void {
    const opcoesFormArray = this.getOpcoes(questaoIndex);
    if (opcoesFormArray.length >= 5) {
      this._snackbarService.showWarn("Máximo de 5 opções atingido para esta questão.");
      return;
    }

    const opcaoForm = this.fb.group({
      rotulo: ['', Validators.required],
      descricao: ['', Validators.required],
      correta: [false]
    });
    opcoesFormArray.push(opcaoForm);
  }

  removeOpcao(questaoIndex: number, opcaoIndex: number): void {
    this.getOpcoes(questaoIndex).removeAt(opcaoIndex);
  }

 
  editProduct(idProva: number) {
    this._avaliacaoService.avaliacaoPorId(idProva).subscribe({
      next: (responseAvaliacao: IProvaP) => { 
        this.populateForm(responseAvaliacao); 
        this.avaliacaoDialog = true; 
      },
      error: (err) => {
        console.error('Erro ao buscar avaliação para edição:', err);
        this._snackbarService.showError('Erro ao carregar avaliação para edição.');
      }
    });
  }

  saveAvaliacao() {
    if (this.provaForm.valid) {
      const avaliacaoToSave: IProvaP = this.provaForm.value;

      if (avaliacaoToSave.id) {
        this._avaliacaoService.updateAvaliacao(avaliacaoToSave.id, avaliacaoToSave).subscribe({
          next: (response) => {
            this._snackbarService.showSuccess('Avaliação atualizada com sucesso!');
            this.getAvaliacaoProfessor(); 
            this.closeAvaliacaoDialog();
          },
          error: (err) => {
            console.error('Erro ao atualizar avaliação:', err);
            this._snackbarService.showError('Erro ao atualizar avaliação.');
          }
        });
      } else {
       
        this._avaliacaoService.createAvaliacao(avaliacaoToSave).subscribe({
          next: (response) => {
            this._snackbarService.showSuccess('Nova avaliação criada com sucesso!');
            this.getAvaliacaoProfessor();
            this.closeAvaliacaoDialog();
          },
          error: (err) => {
            console.error('Erro ao criar avaliação:', err);
            this._snackbarService.showError('Erro ao criar avaliação.');
          }
        });
      }
    } else {
      this._snackbarService.showWarn('Por favor, preencha todos os campos obrigatórios.');
      this.markAllAsTouched(this.provaForm);
    }
  }

  private markAllAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control);
      }
    });
  }

  closeAvaliacaoDialog() {
    this.avaliacaoDialog = false;
    this.provaForm.reset(); 
    this.questoes.clear(); 
  }
}
