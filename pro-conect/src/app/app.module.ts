import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';  
import {provideAnimations} from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';  

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    ToastModule,
    ButtonModule

  ],
  exports:[
    BrowserModule
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideAnimations()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
