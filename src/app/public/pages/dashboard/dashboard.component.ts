import { Component } from '@angular/core';
import {LossAnalyticsComponent} from '../../../analytics/components/loss-analytics/loss-analytics.component';
import {
  OrderPieAnalyticsComponent
} from '../../../analytics/components/order-pie-analytics/order-pie-analytics.component';
import {OrdersAnalyticsComponent} from '../../../analytics/components/orders-analytics/orders-analytics.component';
import {ProfitsAnalyticsComponent} from '../../../analytics/components/profits-analytics/profits-analytics.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    LossAnalyticsComponent,
    OrderPieAnalyticsComponent,
    OrdersAnalyticsComponent,
    ProfitsAnalyticsComponent,
    TranslatePipe,
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
