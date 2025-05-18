import { Component } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { SnackbarService } from './core/service/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private primeng: PrimeNG, private _snackbarService: SnackbarService) {}

    ngOnInit() {
        this.primeng.ripple.set(true);
    }

  title = 'pro-conect';
  toggleDarkModel(){
    const element = document.querySelector('html');
    if(element != null){
      element.classList.toggle('my-app-dark');
    }
  }
}
