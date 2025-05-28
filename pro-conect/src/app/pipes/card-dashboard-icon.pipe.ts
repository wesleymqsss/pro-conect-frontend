import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'cardDashboardIcon',
  standalone: false
})
export class CardDashboardIconPipe implements PipeTransform {
  transform(tipoDeCard: string): string {

    const cardDashboardIcon: { [key: string]: string } = {
      'Total de Alunos': 'pi pi-graduation-cap',
      'Total de Turmas': 'pi pi-users',
      'Total de Aprovados': 'pi pi-thumbs-up',
      'Total de Reprovados': 'pi pi-thumbs-down',
      'Turmas': 'pi pi-users',
      'Disciplinas': 'pi pi-book',
      'Total de Tarefas': 'pi pi-file-edit',
      'Tarefas Realizadas': 'pi pi-check-square',
      'Provas Realizadas': 'pi pi-file-check',
      'Provas Pendentes': 'pi pi-clock'
    }
    return cardDashboardIcon[tipoDeCard];
  }
}
