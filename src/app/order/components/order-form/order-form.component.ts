import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { Dish } from '../../models/dish.entity';
import { DishService } from '../../services/dish.service';
import { OrderService } from '../../services/order.service';
import { OrderDishService } from '../../services/order-dish.service';
import { OrderDish } from '../../models/order-dish.entity';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-order-form',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    DecimalPipe,
    TranslatePipe,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {
  form: FormGroup;
  dishes: Dish[] = [];

  @Output() orderCreated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private orderService: OrderService,
    private orderDishService: OrderDishService
  ) {
    this.form = this.fb.group({
      tableNumber: [null, [Validators.required, Validators.min(1)]],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadDishes();
    this.addDish();
  }

  loadDishes() {
    this.dishService.getAllDishes().subscribe(data => {
      this.dishes = data.map(dish => {
        return new Dish({
          id: dish.id,
          name: dish.name,
          price: Number(dish.price)
        });
      });
    });
  }


  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addDish() {
    this.items.push(this.fb.group({
      dishId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  removeDish(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  calculateTotal(): number {
    let total = 0;

    this.items.controls.forEach(group => {
      const dishId = group.get('dishId')?.value;
      const quantity = group.get('quantity')?.value || 0;
      const dish = this.dishes.find(d => d.id === dishId);

      if (dish && !isNaN(dish.price)) {
        total += dish.price * quantity;
      }
    });

    return total;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const calculatedTotal = this.calculateTotal();
    const currentDate = new Date();
    const tableNumber = Number(this.form.get('tableNumber')?.value);

    const newOrderPayload = {
      table_number: tableNumber,
      total: calculatedTotal,
      createdAt: currentDate.toISOString()
    };

    this.orderService.createOrder(newOrderPayload).subscribe({
      next: (orderCreatedResponse: any) => {
        const newOrderId = orderCreatedResponse.id;

        if (!newOrderId) {
          console.error('No se obtuvo un ID de la orden creada.');
          return;
        }

        const orderDishesRequests = this.items.value.map((item: any) => {
          const dish = this.dishes.find(d => d.id === item.dishId);
          const subtotal = dish ? dish.price * item.quantity : 0;

          return new Promise((resolve, reject) => {
            this.orderDishService.addDishToOrder(
              newOrderId,
              item.dishId,
              item.quantity
            ).subscribe({
              next: resolve,
              error: reject
            });
          });
        });

        Promise.all(orderDishesRequests).then(() => {
          this.form.setControl('items', this.fb.array([]));
          this.form.get('tableNumber')?.reset();
          this.addDish();
          this.orderCreated.emit(); // 🔔 Notificar al padre
        }).catch(error => {
          console.error('Error al registrar uno o más platos:', error);
        });
      },
      error: (err) => {
        console.error('Error al crear la orden:', err);
      }
    });
  }
}
