import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {Dish} from '../../models/dish.entity';
import {DishService} from '../../services/dish.service';
import {OrderService} from '../../services/order.service';
import {OrderDishService} from '../../services/order-dish.service';
import {OrderDish} from '../../models/order-dish.entity';
import {TranslatePipe} from '@ngx-translate/core';

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

  @Output() orderCreated = new EventEmitter<void>(); // Evento para notificar la creación de una orden

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
    this.addDish(); // Añade una fila por defecto para un plato
  }

  loadDishes() {
    this.dishService.getAllDishes().subscribe(data => {
      this.dishes = data;
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
    if (this.items.length > 1) { // Evita remover la última fila si así lo deseas
      this.items.removeAt(index);
    }
  }

  calculateTotal(): number {
    let total = 0;

    this.items.controls.forEach(group => {
      const dishId = group.get('dishId')?.value;
      const quantity = group.get('quantity')?.value || 0;

      const dishSelected = this.dishes.find(d => d.id === dishId);

      if (dishSelected && !isNaN(dishSelected.price)) {
        total += dishSelected.price * quantity;
      } else {
        console.warn(`Plato con ID ${dishId} no encontrado o inválido`);
      }
    });

    return total;
  }

  submit() {
    if (this.form.invalid) {
      // Marcar todos los campos como tocados para mostrar errores de validación si es necesario
      this.form.markAllAsTouched();
      return;
    }

    const calculatedTotal = this.calculateTotal();
    if (isNaN(calculatedTotal)) {
      console.error('El total es NaN. Revisa la selección de platos.');
      return;
    }
    const currentDate = new Date();

    const tableNumber = Number(this.form.get('tableNumber')?.value); // ✅ Conversión segura
    console.log('tableNumber convertido:', tableNumber);
    console.log('Número de mesa ingresado:', this.form.get('tableNumber')?.value);

    const newOrderPayload = {
      tableNumber: Number(this.form.get('tableNumber')?.value)
    };

    console.log('Payload enviado:', newOrderPayload); // ✅ Revisa que sea correcto

    // @ts-ignore
    this.orderService.createOrder(newOrderPayload).subscribe({
      next: (orderCreatedResponse: any) => {
        const newOrderId = orderCreatedResponse.id; // Este es el ID generado por json-server

        if (newOrderId === undefined) {
          console.error('Error: El ID de la orden creada es undefined. Revisa la respuesta de json-server.');
          // Aquí podrías mostrar un mensaje de error al usuario
          return;
        }

        const orderDishesPromises: Promise<any>[] = [];

        this.items.value.forEach((item: any) => {
          const dish = this.dishes.find(d => d.id === item.dishId);
          if (dish) {
            const subtotal = dish.price * item.quantity;
            const orderDishPayload = new OrderDish({
              order_id: newOrderId,
              dish_id: item.dishId,
              quantity: item.quantity,
              subtotal: subtotal
            });
            // Agregamos la promesa del servicio create a un array
            orderDishesPromises.push(
              new Promise((resolve, reject) => {
                this.orderDishService.addDishToOrder(newOrderId, item.dishId, item.quantity).subscribe({
                  next: resolve,
                  error: reject
                });
              })
            );
          }
        });

        // Esperar a que todos los 'order_dishes' se creen
        Promise.all(orderDishesPromises).then(() => {
          console.log('Orden y todos los platos de la orden creados exitosamente.');
          this.form.setControl('items', this.fb.array([]));
          this.form.get('tableNumber')?.reset();
          this.addDish(); // Añadir una nueva fila vacía
          // Añadir una fila vacía para la siguiente orden
          this.orderCreated.emit(); // Emitir evento para notificar al componente padre
        }).catch(error => {
          console.error('Error al crear uno o más OrderDish:', error);
          // Aquí podrías manejar el error, por ejemplo, intentando eliminar la orden creada si los platos fallan
        });

      },
      error: (err) => {
        console.error('Error al crear la orden principal:', err);
        // Mostrar mensaje de error al usuario
      }
    });
  }


}
