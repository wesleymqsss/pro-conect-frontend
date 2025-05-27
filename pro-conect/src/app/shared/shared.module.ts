import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../core/material/material.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { BrowserModule } from "@angular/platform-browser";
import { DirectivesModule } from "../directive/directives.module";
import { FormLoginComponent } from './form-login/form-login.component';
import { FormLoginLeftComponent } from './form-login-left/form-login-left.component';
import { HeaderComponent } from './header/header.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { CardDashboardComponent } from './card-dashboard/card-dashboard.component';
import { EfficiencyGraphComponent } from './efficiency-graph/efficiency-graph.component';
import { GenericCarouselComponent } from './generic-carousel/generic-carousel.component';
import { NoteGraphComponent } from './note-graph/note-graph.component';

@NgModule({
  declarations: [
    FormLoginComponent,
    FormLoginLeftComponent,
    HeaderComponent,
    UserPanelComponent,
    CardDashboardComponent,
    EfficiencyGraphComponent,
    GenericCarouselComponent,
    NoteGraphComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    PipesModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    FormLoginComponent,
    FormLoginLeftComponent,
    HeaderComponent,
    UserPanelComponent,
    CardDashboardComponent
  ]
})
export class SharedModule { }
