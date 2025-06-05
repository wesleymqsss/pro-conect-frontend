import { Component, Input, OnInit } from '@angular/core';
import { AvaliacaoAlunoListResponse } from '../../core/types/avaliacao-aluno-list-response.type';
import { ConversorService } from '../../core/service/conversor.service';
import { IProvaP } from '../../core/interface/avaliacao';
import { AvaliacaoAlunoService } from '../../core/service/avaliacao-aluno.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../core/service/snackbar.service';
@Component({
  selector: 'app-table-avalia-alunos',
  standalone: false,
  templateUrl: './table-avalia-alunos.component.html',
  styleUrl: './table-avalia-alunos.component.scss'
})
export class TableAvaliaAlunosComponent implements OnInit {
  @Input() idUser: number | undefined;
  @Input() provas!: AvaliacaoAlunoListResponse;

  visible: boolean = false;
  isValid: boolean = false;
  isValidMap: { [provaId: number]: boolean } = {};
  prova!: IProvaP;
  formProva!: FormGroup;

  constructor(
    private readonly _conversorService: ConversorService,
    private readonly _avaliacaoService: AvaliacaoAlunoService,
    private _snackbarService: SnackbarService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {

    if (this.formProva.valid) {
      const payload = this.formProva.value;
      this._avaliacaoService.postRespostaAvaliacaoAluno(payload).subscribe({
        next: () => {
          this._snackbarService.showSuccess("Prova enviada com sucesso!!")
          this.isValidMap[payload.provaId] = true;
          setTimeout(() => {
            this.visible = false;
          }, 2000);
        },
        error: (err) => {
          this._snackbarService.showError("Erro ao enviar prova!!")
          setTimeout(() => {
            this.visible = false;
          }, 2000);
          console.error('Erro ao enviar respostas:', err);
        }
      });
    }
  }

  initForm() {
    this.formProva = this.fb.group({
      provaId: [null],
      alunoId: [null],
      questoes: this.fb.array([])
    });
  }
  obterMateria(idMateria: number): string {
    const materia = this._conversorService.conversaoMateria(idMateria);
    return materia;
  }

  obterProfessor(idProfessor: number): string {
    const professor = this._conversorService.conversaoProfessor(idProfessor);
    return professor;
  }

  verificarNota(nota: number) {
    return nota >= 6 ? 'success' : 'danger';
  }

  mostrarDialog(id: number) {

    this._avaliacaoService.getProvaDetalhe(id).subscribe((provaResponse) => {
      this.prova = provaResponse;
      this.carregarProva(this.prova, this.idUser);
    });

    this.visible = true;
  }

  get questoesFA(): FormArray {
    return this.formProva.get('questoes') as FormArray;
  }

  carregarProva(prova: IProvaP, alunoId: number | undefined) {
    this.formProva.patchValue({
      provaId: prova.id,
      alunoId: alunoId
    });

    const questoesForm = prova.questoes.map(q => this.fb.group({
      questaoId: [q.id],
      opcaoEscolhidaId: [null, Validators.required]
    }));

    this.questoesFA.clear();
    questoesForm.forEach(q => this.questoesFA.push(q));
  }
}
