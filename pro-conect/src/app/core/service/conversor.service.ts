import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor() { }


  conversaoMateria(idMateria: number): string {
    switch (idMateria) {
      case 1:
        return 'Banco de Dados';
      case 2:
        return 'Programação WEB';
      case 3:
        return 'Engenharia de Software';
      case 4:
        return 'Redes de Computadores';
      case 5:
        return 'Sistemas Operacionais';
      default:
        return 'Desconhecido';
    }
  }

  conversaoProfessor(idProfessor: number): string {
    switch (idProfessor) {
      case 1:
        return 'João Pimentel';
      case 2:
        return 'João Evangelista';
      case 3:
        return 'Maria Silva';
      case 4:
        return 'Carlos Oliveira';
      default:
        return 'Desconhecido';
    }
  }
}
