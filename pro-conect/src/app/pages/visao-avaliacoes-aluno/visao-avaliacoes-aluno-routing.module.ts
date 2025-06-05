import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisaoAvaliacoesAlunoComponent } from './visao-avaliacoes-aluno.component';

const routes: Routes = [
  {
    path: 'visualizar-avaliacoes-aluno',
    component: VisaoAvaliacoesAlunoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisaoAvaliacoesAlunoRoutingModule { }
