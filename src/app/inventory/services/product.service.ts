import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.entity';
import {environment} from '../../../environments/environment';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.serverBaseUrlProducts);
  }

  addProduct(product: Omit<Product, 'productId'>): Observable<Product> {
    return this.http.post<Product>(environment.serverBaseUrlProducts, product);
  }

  getTotalCostByWeekday(): Observable<{ [day: string]: number }> {
    return this.getProducts().pipe(
      map(products => {
        const totalsByDay: { [key: string]: number } = {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0
        };

        products.forEach(product => {
          const date = new Date(product.expirationDate);
          const dayIndex = date.getUTCDay();
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const dayName = dayNames[dayIndex];

          totalsByDay[dayName] += product.price * product.quantity;
        });

        return totalsByDay;
      })
    );
  }
}
