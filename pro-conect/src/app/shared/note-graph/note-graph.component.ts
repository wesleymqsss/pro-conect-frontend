import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-note-graph',
  standalone: false,
  templateUrl: './note-graph.component.html',
  styleUrl: './note-graph.component.scss'
})
export class NoteGraphComponent {
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
        labels: ['Banco de Dados', 'Programação WEB', 'Programação Mobile', 'Programação Orientada a Objetos'],
        datasets: [
          {
            label: '1 Semestre',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-violet-600'),
            yAxisID: 'y',
            tension: 0.4,
            data: [65, 59, 80, 81, 56, 55, 10]
          },
          {
            label: '2 Semestre',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-violet-900'),
            yAxisID: 'y1',
            tension: 0.4,
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      };

      this.options = {
        stacked: false,
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
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
              color: textColorSecondary
            },
            grid: {
              drawOnChartArea: false,
              color: surfaceBorder
            }
          }
        }
      };
      this.cd.markForCheck();
    }

  }

}
