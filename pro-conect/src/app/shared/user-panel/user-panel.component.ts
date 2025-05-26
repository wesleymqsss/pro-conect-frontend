import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlunoService } from '../../core/service/aluno.service';
import { AlunoListResponse } from '../../core/types/aluno-list-response.type';
import { TurmaListResponse } from '../../core/types/turma-list-response.type';
import { CardDashboardListResponse } from '../../core/types/card-dashboard-list-response.type';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  standalone: false,
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent implements OnInit, OnChanges {

  @Input() alunos!: AlunoListResponse;
  @Input() cards!: CardDashboardListResponse;
  responsiveOptions: any[] | undefined;
  turmas!: TurmaListResponse;

  visible: boolean = false;
  visibleModalProva = false;
  presenca: boolean = false;
  alunoSelecionado!: any;

  constructor(
    private readonly _alunoService: AlunoService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.populandoCarrosel();
    this.populandoTurmas();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cards'] && changes['cards'].currentValue) {
    }
  }

  populandoCarrosel() {
    this.responsiveOptions = [
      {
        breakpoint: '1920px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  populandoTurmas() {
    this.turmas = [
      {
        turma: 'Turma A',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma B',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },

    ];

  }

  routerPageCreateProva() {
    this._router.navigate(['/nova-avaliacao']);
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

  onModalAlunos() {
    this.visible = true;
  }

  onModalProva() {
    this.visible = true;
  }

  showModalProva() {
    this.visibleModalProva = true;
  }
}

