import { NgModule } from "@angular/core";
import { CapitalizeFirstPipe } from "./capitalize-first-pipe.pipe";

@NgModule({
  declarations: [
    CapitalizeFirstPipe
  ],
  exports: [
    CapitalizeFirstPipe
  ],
})
export class PipesModule { }