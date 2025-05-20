import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-efficiency-graph',
  standalone: false,
  templateUrl: './efficiency-graph.component.html',
  styleUrl: './efficiency-graph.component.scss'
})
export class EfficiencyGraphComponent {
  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        labels: ['Banco de Dados', 'Engenharia de Software', 'Estrutura de Dados', 'Lógica Computacional', 'Gestão de Projetos', 'Linguagem Técnica Programação Web', 'Linguagem de Programação Mobile'],
        datasets: [
          {
            type: 'line',
            label: 'Recuperação',
            borderColor: documentStyle.getPropertyValue('--p-violet-950'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [50, 25, 12, 48, 56, 76, 42]
          },
          {
            type: 'bar',
            label: 'Aprovados',
            backgroundColor: documentStyle.getPropertyValue('--p-blue-800'),
            data: [21, 84, 24, 75, 37, 65, 34],
            borderColor: 'white',
            borderWidth: 2
          },
          {
            type: 'bar',
            label: 'Reprovados',
            backgroundColor: documentStyle.getPropertyValue('--p-violet-600'),
            data: [41, 52, 24, 74, 23, 21, 32]
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
      this.cd.markForCheck();
    }
  }
}
