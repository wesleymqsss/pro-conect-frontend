import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { DadosGraphProfListResponse } from '../../core/types/dados-graph-prof-list.type';


@Component({
  selector: 'app-efficiency-graph',
  standalone: false,
  templateUrl: './efficiency-graph.component.html',
  styleUrl: './efficiency-graph.component.scss'
})
export class EfficiencyGraphComponent implements OnChanges {


  @Input() dataGraph!: DadosGraphProfListResponse;

  options: any;

  data: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataGraph'] && changes['dataGraph'].currentValue) {
      this.initChart(this.dataGraph);
    }
  }

  initChart(response: DadosGraphProfListResponse) {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      const labels = response.map(item => item.disciplina);
      const aprovadosData = response.map(item => item.aprovados);
      const reprovadosData = response.map(item => item.reprovados);
      const recuperacaoData = response.map(item => item.recuperacao);

      this.data = {
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: 'Recuperação',
            borderColor: documentStyle.getPropertyValue('--p-violet-950'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: recuperacaoData
          },
          {
            type: 'bar',
            label: 'Aprovados',
            backgroundColor: documentStyle.getPropertyValue('--p-blue-800'),
            data: aprovadosData,
            borderColor: 'white',
            borderWidth: 2
          },
          {
            type: 'bar',
            label: 'Reprovados',
            backgroundColor: documentStyle.getPropertyValue('--p-violet-600'),
            data: reprovadosData
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
