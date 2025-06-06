import {Component, inject, OnInit} from '@angular/core';
import {OrderService} from '../../../order/services/order.service';
import {NgIf} from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexFill, ChartComponent, NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  fill: ApexFill;
};

@Component({
  selector: 'app-profits-analytics',
  imports: [
    ChartComponent,
    NgIf,
    NgApexchartsModule,
  ],
  templateUrl: './profits-analytics.component.html',
  styleUrl: './profits-analytics.component.css'
})
export class ProfitsAnalyticsComponent implements OnInit{

  public chartOptions: ChartOptions = {
    series: [{ name: 'Profit', data: [] }],
    chart: { type: 'area', height: 350 },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    title: { text: ' ', align: 'left' },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: { categories: [] }
  };

  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.getProfitsPerDay().subscribe(data => {
      this.chartOptions.series = [{
        name: 'Profit',
        data: data.map(item => item.profit),
        color: '#4cff00',
      }];
      this.chartOptions.xaxis = {
        categories: data.map(item => item.day)
      };
    });
  }

}
