import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Dish } from '../models/dish.entity';
import { catchError, map, Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishService extends BaseService<Dish> {

  protected override resourceEndpoint = `${environment.serverBaseUrl}${environment.dishesEndpointPath}`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public getAllDishes(): Observable<Dish[]> {
    return this.http.get<any[]>(this.resourcePath(), this.getAuthHeaders()).pipe(
      retry(2),
      map(rawDishes => rawDishes.map(d => new Dish({
        id: d.dish_id,
        name: d.name,
        price: d.price
      }))),
      catchError(this.handleError)
    );
  }
}
