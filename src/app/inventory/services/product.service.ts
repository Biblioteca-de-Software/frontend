import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.entity';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.serverBaseUrlProducts, {
      headers: this.getAuthHeaders()
    });
  }

  addProduct(product: Omit<Product, 'productId'>): Observable<Product> {
    return this.http.post<Product>(environment.serverBaseUrlProducts, product, {
      headers: this.getAuthHeaders()
    });
  }

  getTotalCostByWeekday(): Observable<{ [key: string]: number }> {
    return this.getProducts().pipe(
      map(products => {
        const totals: { [key: string]: number } = {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0
        };

        products.forEach(product => {
          const day = new Date(product.expirationDate).toLocaleDateString('en-US', { weekday: 'long' });
          const total = product.price * product.quantity;  // Usando 'quantity' en lugar de 'stock'
          totals[day] += total;
        });

        return totals;
      })
    );
  }
}
