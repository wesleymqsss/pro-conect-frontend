import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-carousel',
  standalone: false,
  templateUrl: './generic-carousel.component.html',
  styleUrl: './generic-carousel.component.scss'
})
export class GenericCarouselComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() type: 'turma' | 'disciplina' = 'turma';
  @Input() title: string = '';
  @Output() notificarModalAluno = new EventEmitter<string>();
  @Output() notificarModalProvas = new EventEmitter<void>();

  responsiveOptions: any[] | undefined;
  idProfessor!: number;

  constructor(
    private _router: Router
  ) { }


  ngOnInit(): void {
    this.populandoCarrosel();
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

  routerPageViewProof(id: number) {
    this._router.navigate(['visualizar-avaliacoes-aluno'], { queryParams: { idProfessor: id } });
  }

  notificarModalAlunos(turma: string) {
    const texto = turma;
    const nomeDaTurma = texto.substring(6).toLowerCase();
    this.notificarModalAluno.emit(nomeDaTurma);
  }

  notificarModalProva() {
    this.notificarModalProvas.emit();
  }
}
