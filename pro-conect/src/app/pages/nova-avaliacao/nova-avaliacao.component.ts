import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserLogin } from '../../core/interface/userLogin';
import { LoginService } from '../../core/service/login.service';

interface Materia {
  name: string;
  code: string;
}

interface RespostaOpcao {
  letra: string;
  descricao: string; // Para o p-editor
  correta: boolean;  // Para o p-checkbox
}
@Component({
  selector: 'app-nova-avaliacao',
  standalone: false,
  templateUrl: './nova-avaliacao.component.html',
  styleUrl: './nova-avaliacao.component.scss'
})

export class NovaAvaliacaoComponent {
  currentUser: UserLogin | null = null;
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;
  private loginStatusSubscription!: Subscription;
  text: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
  materias: Materia[] | undefined;
  selectedMateria: Materia | undefined;

  constructor(private _loginService: LoginService) { }

  respostas: RespostaOpcao[] = [
    { letra: 'A', descricao: '<div>Conteúdo inicial A</div>', correta: false },
    { letra: 'B', descricao: '<div>Conteúdo inicial B</div>', correta: false },
    { letra: 'C', descricao: '<div>Conteúdo inicial C</div>', correta: false },
    { letra: 'D', descricao: '<div>Conteúdo inicial D</div>', correta: false },
  ];

  ngOnInit(): void {

    this.materias = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.userSubscription = this._loginService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log('sou o usuario logado na avaliacao', this.currentUser)
    });

    this.loginStatusSubscription = this._loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

}