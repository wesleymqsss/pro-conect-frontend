import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { DadosGraphNoteListResponse } from '../../core/types/dados-graph-note-list-response.type';

@Component({
  selector: 'app-note-graph',
  standalone: false,
  templateUrl: './note-graph.component.html',
  styleUrl: './note-graph.component.scss'
})
export class NoteGraphComponent {

  @Input() dataGraph!: DadosGraphNoteListResponse;

  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataGraph'] && changes['dataGraph'].currentValue) {
      this.initChart(this.dataGraph);
    }
  }

  initChart(response: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      // Transforma o response nos dados para o gráfico
      const labels = response.map(item => item.label);
      const semestre1Data = response.map(item => item.semestre1);
      const semestre2Data = response.map(item => item.semestre2);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: '1º Semestre',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-violet-600'),
            yAxisID: 'y',
            tension: 0.4,
            data: semestre1Data
          },
          {
            label: '2º Semestre',
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-violet-900'),
            yAxisID: 'y1',
            tension: 0.4,
            data: semestre2Data
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
