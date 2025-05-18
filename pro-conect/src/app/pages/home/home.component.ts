import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userId!: string;
  userLogin!: UserLogin;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _loginService: LoginService
  ) { }

  ngOnInit() {
     this.idUser();
  }

  idUser() {
    this.userId = this._route.snapshot.paramMap.get('id')!;
    const userIdInt = parseInt(this.userId);
    this.getUser(userIdInt);
  }
  
  getUser(id: number) {
    this._loginService.getUserId(id).subscribe({
      next: (responseUserLogin) => {
        this.userLogin = responseUserLogin;
        console.log(this.userLogin);
      }
    });
  }

}
