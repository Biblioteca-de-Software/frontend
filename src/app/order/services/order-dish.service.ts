import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { OrderDish } from '../models/order-dish.entity';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderDishService extends BaseService<OrderDish> {

  protected override resourceEndpoint = `${environment.serverBaseUrl}${environment.orderDishesEndpointPath}`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  addDishToOrder(orderId: number, dishId: number, quantity: number): Observable<any> {
    return this.http.post(
      `${environment.serverBaseUrl}/orders/order-summary/${orderId}`,
      { dishId, quantity },
      this.httpOptions
    );
  }
}
