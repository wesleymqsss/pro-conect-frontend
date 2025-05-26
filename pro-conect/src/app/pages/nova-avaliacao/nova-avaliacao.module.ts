import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../core/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { NovaAvaliacaoComponent } from './nova-avaliacao.component';
import { NovaAvaliacaoRoutingModule } from './nova-avaliacao-routing.module';

@NgModule({
  declarations: [
    NovaAvaliacaoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    NovaAvaliacaoRoutingModule
  ],
  exports: [
    NovaAvaliacaoComponent
  ]
})

export class NovaAvaliacaoModule { }
