import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlunoService } from '../../core/service/aluno.service';
import { AlunoListResponse } from '../../core/types/aluno-list-response.type';
import { TurmaListResponse } from '../../core/types/turma-list-response.type';
import { CardDashboardListResponse } from '../../core/types/card-dashboard-list-response.type';
import { Input } from '@angular/core';
import { DisciplinaListResponse } from '../../core/types/disciplina-list-response.type';
import { Router } from '@angular/router';
import { DadosGraphProfListResponse } from '../../core/types/dados-graph-prof-list.type';
import { DadosGraphNoteListResponse } from '../../core/types/dados-graph-note-list-response.type';

@Component({
  selector: 'app-user-panel',
  standalone: false,
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent implements OnInit, OnChanges {

  @Input() alunos!: AlunoListResponse;
  @Input() cardsProf!: CardDashboardListResponse;
  @Input() cardsAlun!: CardDashboardListResponse;
  @Input() disciplinas!: DisciplinaListResponse;
  @Input() turmas!: TurmaListResponse;
  @Input() dataGraphProf!: DadosGraphProfListResponse;
  @Input() dataGraphAlun!: DadosGraphNoteListResponse;
  @Input() isProfessor!: boolean;

  @Output() nomeDaTurmaEmit = new EventEmitter<string>();

  visible: boolean = false;
  visibleModalProva = false;
  presenca: boolean = false;
  alunoSelecionado!: any;
  filtroGlobal!: string;

  constructor(
    private readonly _alunoService: AlunoService,
    private _router: Router,
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cardsProf'] && changes['cardsProf'].currentValue) {
    }
    if (changes['dataGraphProf'] && changes['dataGraphProf'].currentValue) {
    }
    if (changes['dataGraphAlun'] && changes['dataGraphAlun'].currentValue) {
    }
    if (changes['turmas'] && changes['turmas'].currentValue) {
    }
  }

  routerPageCreateProva() {
    this._router.navigate(['/nova-avaliacao']);
  }

  routerPageViewProva() {
   this._router.navigate(['/visualizar-avaliacoes']);
   console.log('pagina view')
  }

  obterAprovadoEReprovado(nota: number) {
    if (nota >= 6) {
      return 'success';
    }
    return 'warn';
  }

  mostrarFaltas(id: number) {
    if (this.alunoSelecionado === id) {
      this.alunoSelecionado = null; // fecha se clicar novamente
    } else {
      this.alunoSelecionado = id; // abre apenas o clicado
    }
  }

  onModalAlunos(turma: string) {
    this.nomeDaTurmaEmit.emit(turma);
    this.visible = true;
  }

  onModalProva() {
    this.visible = true;
  }

  showModalProva() {
    this.visibleModalProva = true;
  }
}

