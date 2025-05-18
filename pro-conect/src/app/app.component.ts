import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent {
  constructor(private primeng: PrimeNG) {}

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
