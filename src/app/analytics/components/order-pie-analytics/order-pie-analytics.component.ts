import {Component, OnInit} from '@angular/core';
import {OrderDishService} from '../../../order/services/order-dish.service';
import {DishService} from '../../../order/services/dish.service';
import {ChartComponent} from 'ng-apexcharts';
import {NgIf} from '@angular/common';

export type PieChartOptions = {
  series: number[];
  chart: ApexChart & { type: 'pie' };
  labels: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-order-pie-analytics',
  imports: [
    ChartComponent,
    NgIf
  ],
  templateUrl: './order-pie-analytics.component.html',
  styleUrl: './order-pie-analytics.component.css'
})
export class OrderPieAnalyticsComponent implements OnInit{

  public chartOptions?: PieChartOptions;

  constructor(
    private orderDishesService: OrderDishService,
    private dishService: DishService
  ) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData(): void {
    this.orderDishesService.getAll().subscribe(orderDishes => {
      this.dishService.getAllDishes().subscribe(dishes => {
        const salesMap = new Map<number, number>();

        for (let od of orderDishes) {
          const dishId = od['dish_id'] || od.dish_id;
          const currentQty = salesMap.get(dishId) || 0;
          salesMap.set(dishId, currentQty + od.quantity);
        }

        const labels: string[] = [];
        const values: number[] = [];

        for (let dish of dishes) {


          // @ts-ignore
          const dishId = dish['dish_id'] || dish.id;
          const qty = salesMap.get(dishId) || 0;
          labels.push(dish.name);
          values.push(qty);
        }

        this.chartOptions = {
          series: values,
          chart: {
            type: 'pie',
            height: 350
          },
          labels: labels,
          title: {
            text: ' '
          }
        };
      });
    });
  }

}
