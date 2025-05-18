import { Component } from '@angular/core';

@Component({
  selector: 'app-form-login',
  standalone: false,
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  name: string = '';

  email: string = '';

  accept: boolean = false;

  loading: boolean = false;

  load() {
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false
    }, 2000);
  }
}
