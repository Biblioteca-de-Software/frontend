import { Component } from '@angular/core';
import {Order} from '../../models/order.entity';
import {OrderService} from '../../services/order.service';
import {OrderListComponent} from '../../components/order-list/order-list.component';
import {OrderResource} from '../../services/order.response';
import {OrderAssembler} from '../../services/order.assembler';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {OrderFormComponent} from '../../components/order-form/order-form.component';

@Component({
  selector: 'app-orders',
  imports: [
    OrderListComponent,
    CommonModule,
    RouterModule,
    OrderFormComponent,
  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: Order[] = [];

  constructor(private apiService: OrderService) {
    // @ts-ignore
    this.apiService.getAll().subscribe((resources: OrderResource[]) => {
      this.orders = resources.map(OrderAssembler.toEntityFromResource);
    });
  }

}
