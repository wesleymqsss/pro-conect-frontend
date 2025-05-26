import { NgModule } from "@angular/core";
import { CapitalizeFirstPipe } from "./capitalize-first-pipe.pipe";
import { CardDashboardIconPipe } from "./card-dashboard-icon.pipe";

@NgModule({
  declarations: [
    CapitalizeFirstPipe,
    CardDashboardIconPipe
  ],
  exports: [
    CapitalizeFirstPipe,
    CardDashboardIconPipe
  ],
})
export class PipesModule { }
