import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Order } from '../models/order.entity';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> {

  protected override resourceEndpoint = `${environment.serverBaseUrl}${environment.ordersEndpointPath}`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getProfitsPerDay(): Observable<{ day: string, profit: number }[]> {
    return this.http.get<Order[]>(this.resourceEndpoint, this.getAuthHeaders()).pipe(
      map((orders: Order[]) => {
        const profitsMap = new Map<string, number>();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (const order of orders) {
          const date = new Date(order.createdAt);
          const day = daysOfWeek[date.getDay()];
          profitsMap.set(day, (profitsMap.get(day) || 0) + order.total);
        }

        return daysOfWeek.map(day => ({
          day,
          profit: profitsMap.get(day) || 0
        }));
      })
    );
  }

  createOrder(payload: {
    table_number: number,
    total: number,
    createdAt: string
  }): Observable<any> {
    return this.http.post(this.resourceEndpoint, payload, this.httpOptions);
  }
}
