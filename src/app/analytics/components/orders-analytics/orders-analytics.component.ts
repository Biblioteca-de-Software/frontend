import {Component, OnInit} from '@angular/core';
import {ChartComponent, ChartType} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {NgIf} from '@angular/common';
import {OrderDishService} from '../../../order/services/order-dish.service';
import {DishService} from '../../../order/services/dish.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart & {type: ChartType};
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-orders-analytics',
  imports: [
    ChartComponent,
    NgIf,
    NgApexchartsModule,
  ],
  templateUrl: './orders-analytics.component.html',
  styleUrl: './orders-analytics.component.css'
})
export class OrdersAnalyticsComponent implements OnInit {

  public chartOptions?: ChartOptions | undefined;

  constructor(private orderDishesService: OrderDishService, private dishService: DishService) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData(): void {
    this.orderDishesService.getAll().subscribe(orderDishes => {
      console.log('orderDishes:', orderDishes);

      this.dishService.getAllDishes().subscribe(dishes => {
        console.log('dishes:', dishes);

        const salesMap = new Map<number, number>();


        for (let od of orderDishes) {
          const dishId = od['dish_id'] || od.dish_id;
          const currentQty = salesMap.get(dishId) || 0;
          salesMap.set(dishId, currentQty + od.quantity);
        }

        const labels: string[] = [];
        const values: number[] = [];

        for (let dish of dishes) {
          //@ts-ignore
          const dishId = dish['dish_id'] || dish.id;
          const qty = salesMap.get(dishId) || 0;
          labels.push(dish.name);
          values.push(qty);
        }

        console.log('labels:', labels);
        console.log('values:', values);

        this.chartOptions = {
          series: [
            {
              name: 'Sales',
              data: values
            }
          ],
          chart: {
            type: 'bar',
            height: 350
          },
          title: {
            text: ' '
          },
          xaxis: {
            categories: labels
          }
        };
      });
    });
  }

}
