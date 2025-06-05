import { Component, Input } from '@angular/core';
import { AvaliacaoAlunoListResponse } from '../../core/types/avaliacao-aluno-list-response.type';

@Component({
  selector: 'app-avalia-tabs',
  standalone: false,
  templateUrl: './avalia-tabs.component.html',
  styleUrl: './avalia-tabs.component.scss'
})
export class AvaliaTabsComponent {
  @Input() idUser: number | undefined;
  @Input() provas!: AvaliacaoAlunoListResponse;
}
