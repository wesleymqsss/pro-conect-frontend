import { Component } from '@angular/core';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';
import { MessageService } from 'primeng/api';
import { SnackbarService } from '../../core/service/snackbar.service';


@Component({
  selector: 'app-form-login',
  standalone: false,
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  userLogin!: UserLogin;

  constructor(
    private readonly _userLoginService: LoginService,
    private readonly _snackbarService: SnackbarService) { }

  name: string = '';

  email: string = '';

  accept: boolean = false;

  loading: boolean = false;

  load() {
    this.loading = true;
    setTimeout(() => {
      if (this.accept !== false) {
        this.getUserLogin();
      } else {
        console.log('sou o termo de falso', this.accept);
        this._snackbarService.showWarn('Favor, aceitar termos de uso!');
      }

      this.loading = false
    }, 2000);
  }

  getUserLogin() {
      console.log('sou o termo de verdadeiro', this.accept);
      this._userLoginService.getUserLogin(this.name, this.email).subscribe({
        next: (responseUserLogin) => {
          this.userLogin = responseUserLogin;
        }, error: (err) => {
          this._snackbarService.showError('Usuário não encontrado. Favor, verificar dados de login!');
        }
      })
  }
}
