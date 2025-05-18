import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { UserLogin } from '../../core/interface/userLogin';
import { LoginService } from '../../core/service/login.service';

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

  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(){

  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ];
    console.log(this.userLogin)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['userLogin'] && changes['userLogin'].currentValue){
     this.newUserLogin = (changes['userLogin'].currentValue);

    }
    
  }

}
