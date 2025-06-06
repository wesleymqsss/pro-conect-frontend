import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { UserLogin } from '../../core/interface/userLogin';
import { LoginService } from '../../core/service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../core/service/snackbar.service';
import { confirmarSenharIguais } from '../../validators/passwordValidators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() userLogin!: UserLogin;
  newUserLogin!: any
  items: MenuItem[] | undefined;
  visible: boolean = false;
  visibleEditProfile: boolean = false;
  formUpdateUser!: FormGroup;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _snackbarService: SnackbarService,
    private _router: Router) {
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  ngOnInit() {
    this.createForm();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home/' + this.newUserLogin.id]
      },
      {
        label: 'Contato',
        icon: 'pi pi-envelope',
        command: () => this.contactWpp()
      },
      {
        label: 'Perfil',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Atualizar Perfil',
            icon: 'pi pi-user-edit',
            command: () => this.showDialog()
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.logout()

          },
        ]
      },
    ]
  }
  contactWpp(): void {
    const url = "https://wa.me/5511999999999"

    window.open(url, "_blank");
  }

  logout(): void {
    this._loginService.logout();
    this._router.navigate(['']);
  }

  createForm() {
    this.formUpdateUser = this._fb.group(
      {
        username: [this.newUserLogin.username, Validators.required,],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
      },
      {
        validators: confirmarSenharIguais('password', 'confirmpassword')
      }
    );

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userLogin'] && changes['userLogin'].currentValue) {
      this.newUserLogin = (changes['userLogin'].currentValue);

      this.createForm();
    }
  }

  showDialog() {
    this.visibleEditProfile = true;
  }

  submitUpdate() {
    const idUser = this.newUserLogin.user.id;
    const role = this.newUserLogin.user.role;

    if (this.formUpdateUser.invalid) {
      this._snackbarService.showContrast("Favor, verificar se todos os campos estão preenchidos corretamente.");
      this.formUpdateUser.markAllAsTouched();
      return;
    }

    const updateUser = {
      id: idUser,
      username: this.formUpdateUser.get('username')?.value,
      password: this.formUpdateUser.get('password')?.value,
      role: role
    }

    this._loginService.updateUser(idUser, updateUser).subscribe({
      next: (data) => {
        this._snackbarService.showSuccess("Usuário atualizado com sucesso!!!");
        this.visibleEditProfile = false;
        this.formUpdateUser.reset();
      }, error: (err) => {
        if (err.status === 200) {
          this._snackbarService.showSuccess("Usuário atualizado com sucesso!!!");
          this.visibleEditProfile = false;
          this.formUpdateUser.reset();
        } else {
          this._snackbarService.showContrast("Error ao salvar alterações.")
        }
      }
    })
  }

  closeModal() {
    this.visibleEditProfile = false
    this.formUpdateUser.get('password')?.reset();
    this.formUpdateUser.get('confirmpassword')?.reset();
  }

}
