import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizarAvaliacoesComponent } from './visualizar-avaliacoes.component';


const routes: Routes = [
  {
    path: 'visualizar-avaliacoes',
    component: VisualizarAvaliacoesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizarAvaliacoesRoutingModule { }
