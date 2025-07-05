import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {OrderFormComponent} from '../../components/order-form/order-form.component';
import {OrderCardComponent} from '../../components/order-card/order-card.component';

@Component({
  selector: 'app-orders',
  imports: [
    CommonModule,
    RouterModule,
    OrderFormComponent,
    OrderCardComponent,

  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  @ViewChild('orderCard', { static: true }) orderCardComponent!: OrderCardComponent;

  onNewOrder() {
    if (this.orderCardComponent) {
      this.orderCardComponent.loadData();
    }
  }

}
