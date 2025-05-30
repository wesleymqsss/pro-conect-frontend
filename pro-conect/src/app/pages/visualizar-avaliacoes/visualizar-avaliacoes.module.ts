import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../core/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { VisualizarAvaliacoesComponent } from './visualizar-avaliacoes.component';
import { VisualizarAvaliacoesRoutingModule } from './visualizar-avaliacoes-routing.module';


@NgModule({
  declarations: [
     VisualizarAvaliacoesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    VisualizarAvaliacoesRoutingModule
  ],
  exports: [
    VisualizarAvaliacoesComponent
  ]
})

export class VisualizarAvaliacoesModule { }
