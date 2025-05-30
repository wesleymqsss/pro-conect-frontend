import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NovaAvaliacaoComponent } from './pages/nova-avaliacao/nova-avaliacao.component';
import { VisualizarAvaliacoesComponent } from './pages/visualizar-avaliacoes/visualizar-avaliacoes.component';

const routes: Routes = [
  {
    path: 'home/:id',
    component: HomeComponent
  },
  {
    path: '',
    component: LoginComponent

  },
  {
    path: 'nova-avaliacao',
    component: NovaAvaliacaoComponent

  },
  {
    path: 'visualizar-avaliacoes',
    component: VisualizarAvaliacoesComponent

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
