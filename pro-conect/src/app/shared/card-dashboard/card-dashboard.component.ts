import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  standalone: false,
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.scss'
})
export class CardDashboardComponent {
  @Input() tipo!: string;
  @Input() value!: string | number;
}
