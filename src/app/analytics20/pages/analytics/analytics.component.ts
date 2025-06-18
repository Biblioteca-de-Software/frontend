import {Component, OnInit} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle, ChartComponent
} from 'ng-apexcharts';


import {CommonModule, NgIf} from '@angular/common';

export type ChartOptions = {
  series: any[];
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  title?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
};

@Component({
  selector: 'app-analytics',
  imports: [
    CommonModule,
    ChartComponent,
    NgIf
  ],
  templateUrl: './analytics.component.html',
  standalone: true,
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit{

  incomeChartOptions!: ChartOptions;
  lossChartOptions!: ChartOptions;

  // Suponiendo que la fecha actual es 2025-05-23 para hacer cálculo de vencidos
  currentDate = new Date('2025-05-23');

  // Simulación de productos y órdenes (puedes cambiar por tu llamada real al backend)
  products = [
    { id: 1, name: 'Tomate', expirationDate: '2025-06-15', quantity: 50 },
    { id: 2, name: 'Pan de hamburguesa', expirationDate: '2025-05-30', quantity: 30 },
    { id: 3, name: 'Queso', expirationDate: '2025-06-10', quantity: 20 },
    { id: 4, name: 'Lechuga', expirationDate: '2025-05-25', quantity: 40 },
    { id: 5, name: 'Carne molida', expirationDate: '2025-05-24', quantity: 25 }, // Vencido
    { id: 6, name: 'Salsa de tomate', expirationDate: '2025-07-01', quantity: 15 }
  ];

  orders = [
    {
      id: 1,
      tableNumber: 5,
      items: [
        { name: 'Pizza', quantity: 2, price: 20 },
        { name: 'Coca Cola', quantity: 1, price: 8 }
      ],
      total: 48,
      createdAt: '2025-05-22T14:00:00Z'
    },
    {
      id: 2,
      tableNumber: 3,
      items: [
        { name: 'Hamburguesa', quantity: 1, price: 18 }
      ],
      total: 18,
      createdAt: '2025-05-22T15:30:00Z'
    },
    {
      id: 3,
      tableNumber: 1,
      items: [
        { name: 'Papas Fritas', quantity: 3, price: 10 },
        { name: 'Coca Cola', quantity: 2, price: 8 }
      ],
      total: 46,
      createdAt: '2025-05-23T12:15:00Z'
    },
    {
      id: 4,
      tableNumber: 4,
      items: [
        { name: 'Pizza', quantity: 1, price: 20 },
        { name: 'Hamburguesa', quantity: 2, price: 18 }
      ],
      total: 56,
      createdAt: '2025-05-23T13:45:00Z'
    },
    {
      id: 5,
      tableNumber: 2,
      items: [
        { name: 'Papas Fritas', quantity: 1, price: 10 },
        { name: 'Agua Mineral', quantity: 2, price: 6 }
      ],
      total: 22,
      createdAt: '2025-05-23T14:00:00Z'
    }
  ];

  ngOnInit(): void {
    this.loadIncomeChart();
    this.loadLossChart();
  }

  private loadIncomeChart() {
    // Agrupa ingresos por fecha (día)
    const ingresosPorDia = new Map<string, number>();

    this.orders.forEach(order => {
      const date = order.createdAt.split('T')[0]; // yyyy-mm-dd
      ingresosPorDia.set(date, (ingresosPorDia.get(date) ?? 0) + order.total);
    });

    const dates = Array.from(ingresosPorDia.keys()).sort();
    const ingresos = dates.map(date => ingresosPorDia.get(date) ?? 0);

    this.incomeChartOptions = {
      series: [
        {
          name: 'Ingresos',
          data: ingresos
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Ingresos por Día'
      },
      xaxis: {
        categories: dates
      },
      dataLabels: {
        enabled: true
      }
    };
  }

  private loadLossChart() {
    // Productos vencidos y calcular pérdidas = sum (cantidad * precio estimado)
    // Como ejemplo precio estimado fijo (ejemplo 10 por producto), ajusta según tu lógica
    const precioEstimadoPorProducto = 10;

    // Filtra productos vencidos (fecha expiración anterior a currentDate)
    const vencidos = this.products.filter(p => new Date(p.expirationDate) < this.currentDate);

    const cantidadVencida = vencidos.reduce((acc, p) => acc + p.quantity, 0);
    const perdidas = vencidos.map(p => p.quantity * precioEstimadoPorProducto);

    const fechasVencimiento = vencidos.map(p => p.expirationDate);

    this.lossChartOptions = {
      series: [
        {
          name: 'Pérdidas',
          data: perdidas.length ? perdidas : [0] // Si no hay datos poner 0 para evitar error
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Pérdidas por Productos Vencidos'
      },
      xaxis: {
        categories: fechasVencimiento.length ? fechasVencimiento : ['Sin datos']
      },
      dataLabels: {
        enabled: true
      }
    };
  }

  // Función para validar que el dato es número y positivo, para evitar errores en template
  isPositiveNumber(value: any): boolean {
    return typeof value === 'number' && value > 0;
  }

}
