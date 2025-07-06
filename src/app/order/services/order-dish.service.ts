import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { OrderDish } from '../models/order-dish.entity';
import { environment } from '../../../environments/environment';
import {catchError, map, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

const orderDishesEndpointPath = environment.orderDishesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class OrderDishService extends BaseService<OrderDish> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = orderDishesEndpointPath;
  }

  override getAll(): Observable<OrderDish[]> {
    return this.http.get<any[]>(
      `${environment.serverBaseUrl}${this.resourceEndpoint}`,
      this.getAuthHeaders()
    ).pipe(
      map(rawData => rawData.map(od => new OrderDish({
        id: od.id,
        order_id: od.order_id,
        dish_id: od.dish_id,
        quantity: od.quantity,
        subtotal: od.subtotal
      }))),
      catchError(this.handleError)
    );
  }

  addDishToOrder(orderId: number, dishId: number, quantity: number): Observable<any> {
    return this.http.post(
      `${environment.serverBaseUrl}/orders/order-summary/${orderId}`,
      { dishId, quantity },
      this.getAuthHeaders()
    );
  }
}
