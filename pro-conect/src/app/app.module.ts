import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { LoginModule } from './pages/login/login.module';
import { Noir } from '../styles';
import { provideHttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NovaAvaliacaoModule } from './pages/nova-avaliacao/nova-avaliacao.module';
import { VisualizarAvaliacoesModule } from './pages/visualizar-avaliacoes/visualizar-avaliacoes.module';
import { VisaoAvaliacoesAlunoComponent } from './pages/visao-avaliacoes-aluno/visao-avaliacoes-aluno.component';
import { VisaoAvaliacoesAlunoModule } from './pages/visao-avaliacoes-aluno/visao-avaliacoes-aluno.module';

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
    ButtonModule,
    LoginModule,
    NovaAvaliacaoModule,
    VisualizarAvaliacoesModule,
    VisaoAvaliacoesAlunoModule
  ],
  exports: [
    BrowserModule
  ],
  providers: [
    provideHttpClient(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    }),
    provideAnimations(),
    MessageService,
    ConfirmationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
