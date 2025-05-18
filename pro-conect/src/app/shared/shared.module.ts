import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../core/material/material.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { BrowserModule } from "@angular/platform-browser";
import { DirectivesModule } from "../directive/directives.module";
import { FormLoginComponent } from './form-login/form-login.component';
import { FormLoginLeftComponent } from './form-login-left/form-login-left.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        FormLoginComponent,
        FormLoginLeftComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        BrowserModule,
        PipesModule,
        DirectivesModule
    ],
    exports: [
        FormsModule,
        FormLoginComponent,
        FormLoginLeftComponent,
        HeaderComponent
    ]
})
export class SharedModule { }