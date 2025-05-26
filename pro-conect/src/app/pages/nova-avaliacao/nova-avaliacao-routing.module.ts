import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovaAvaliacaoComponent } from './nova-avaliacao.component';

const routes: Routes = [
  {
    path: 'nova-avaliacao',
    component: NovaAvaliacaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovaAvaliacaoRoutingModule { }
