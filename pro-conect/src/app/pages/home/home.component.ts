import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userId!: string;

  constructor(
    private readonly _route: ActivatedRoute,
  ){} 

  ngOnInit() {
    this.userId =  this._route.snapshot.paramMap.get('id')!;
    console.log('id usuario', this.userId);
  }

}
