import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../core/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { VisaoAvaliacoesAlunoComponent } from './visao-avaliacoes-aluno.component';
import { VisaoAvaliacoesAlunoRoutingModule } from './visao-avaliacoes-aluno-routing.module';

@NgModule({
  declarations: [
    VisaoAvaliacoesAlunoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    VisaoAvaliacoesAlunoRoutingModule
  ],
  exports: [
    VisaoAvaliacoesAlunoComponent
  ]
})

export class VisaoAvaliacoesAlunoModule { }
