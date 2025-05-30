import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserLogin } from '../../core/interface/userLogin';
import { LoginService } from '../../core/service/login.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { SnackbarService } from '../../core/service/snackbar.service';
import { AvaliacaoService } from '../../core/service/avaliacao.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-nova-avaliacao',
  standalone: false,
  templateUrl: './nova-avaliacao.component.html',
  styleUrl: './nova-avaliacao.component.scss'
})

export class NovaAvaliacaoComponent {
  currentUser: UserLogin | null = null;
  isLoggedIn: boolean = false;
  provaForm!: FormGroup;
  currentStep: number = 1
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;

  constructor(
    private _loginService: LoginService,
    private fb: FormBuilder,
    private _snackbarService: SnackbarService,
    private _avaliacaoService: AvaliacaoService,
  ) { }


  ngOnInit(): void {
    this.getUserLogin();
    this.createProvaForm();
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
    });

    this.loginStatusSubscription = this._loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  createProvaForm() {
    this.provaForm = this.fb.group({
      descricao: ['', Validators.required],
      dataProva: ['', Validators.required],
      materiaId: [null, Validators.required],
      professorId: [this.currentUser?.user.id, Validators.required],
      questoes: this.fb.array([])
    });
  }

  get questoes(): FormArray {
    return this.provaForm?.get('questoes') as FormArray;
  }

  addQuestao(): void {
    const questaoForm = this.fb.group({
      texto: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      professorId: [this.currentUser?.user.id, Validators.required],
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

    const opcaoForm = this.fb.group({
      rotulo: ['', Validators.required],
      descricao: ['', Validators.required],
      correta: [false]
    });

    if (opcoesFormArray.length >= 5) {
      this._snackbarService.showWarn("Máximo de 5 opções atingido para esta questão.");
      return;
    } else {
      this.getOpcoes(questaoIndex).push(opcaoForm);
    }

  }

  removeOpcao(questaoIndex: number, opcaoIndex: number): void {
    this.getOpcoes(questaoIndex).removeAt(opcaoIndex);
  }

  goToNextStep(nextStep: number, currentFormGroup: FormGroup | FormArray): void {
    this.markAllAsTouched(currentFormGroup);

    if (currentFormGroup.valid) {
      this.currentStep = nextStep;
    } else {
      this._snackbarService.showWarn('Preencha todos os campos obrigatórios antes de prosseguir.');
    }
  }

  onSubmit(): void {
    this.markAllAsTouched(this.provaForm);

    if (this.provaForm.valid) {
      const provaData = { ...this.provaForm.value };

      if (provaData.dataProva) {
        const date = new Date(provaData.dataProva);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        provaData.dataProva = `${year}-${month}-${day}`;
      }

      this._avaliacaoService.createAvaliacao(provaData).subscribe({
        next: (suss) => {
          this._snackbarService.showSuccess('Prova criada com sucesso!');
          this.provaForm.reset();
          this.createProvaForm();
          this.currentStep = 1;
        },
        error: (err) => {
          console.log('Deu erro', provaData);
          console.error('error: ', err);
          this._snackbarService.showError('Erro ao criar a prova. Verifique os dados e tente novamente.');
        }
      });
    } else {
      console.log('Formulário Inválido', this.provaForm.getRawValue());
      this._snackbarService.showWarn('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }


  private markAllAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control);
      }
    })
  }

}