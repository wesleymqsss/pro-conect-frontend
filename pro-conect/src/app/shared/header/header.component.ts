import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { UserLogin } from '../../core/interface/userLogin';
import { LoginService } from '../../core/service/login.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() {
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home/' + this.newUserLogin.id]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope'
      },
      {
        label: 'Perfil',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Blocks',
            icon: 'pi pi-server'
          },
          {
            label: 'Atualizar Perfil',
            icon: 'pi pi-user-edit',
            command: () => this.showDialog()
          },
           {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            routerLink: ['/']

          },
        ]
      },
    ]
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userLogin'] && changes['userLogin'].currentValue) {
      this.newUserLogin = (changes['userLogin'].currentValue);

    }
  }

    showDialog() {
        this.visibleEditProfile = true;
    }

}
