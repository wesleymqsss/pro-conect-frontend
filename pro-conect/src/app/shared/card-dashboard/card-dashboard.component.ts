import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  standalone: false,
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.scss'
})
export class CardDashboardComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() value!: string | number;
}
