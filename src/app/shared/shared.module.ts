import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../core/material/material.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { BrowserModule } from "@angular/platform-browser";
import { DirectivesModule } from "../directive/directives.module";

@NgModule({
    declarations: [
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
    ]
})
export class SharedModule { }