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

  compareDishById = (a: any, b: any): boolean => {
    return a === b || +a === +b;
  };


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
      this.form.markAllAsTouched();
      return;
    }

    const calculatedTotal = this.calculateTotal();
    if (isNaN(calculatedTotal)) {
      console.error('El total es NaN. Revisa la selección de platos.');
      return;
    }

    const tableNumber = Number(this.form.get('tableNumber')?.value);
    const newOrderPayload = { tableNumber };

    console.log('Payload enviado:', newOrderPayload);

    this.orderService.createOrder(newOrderPayload).subscribe({
      next: (orderCreatedResponse: any) => {
        const newOrderId = orderCreatedResponse.id;

        if (newOrderId === undefined) {
          console.error('Error: El ID de la orden creada es undefined.');
          return;
        }

        const orderDishesPromises: Promise<any>[] = [];

        this.items.value.forEach((item: any, index: number) => {
          const dishId = item.dishId;
          const quantity = item.quantity;

          // Validación de datos antes de enviar al backend
          if (!dishId || isNaN(dishId) || !quantity || isNaN(quantity)) {
            console.warn(`❌ Datos inválidos en fila ${index}:`, item);
            return; // Saltar este item
          }

          const dish = this.dishes.find(d => d.id === dishId);
          if (!dish) {
            console.warn(`❌ Plato con ID ${dishId} no encontrado`);
            return;
          }

          const subtotal = dish.price * quantity;

          orderDishesPromises.push(
            new Promise((resolve, reject) => {
              this.orderDishService.addDishToOrder(newOrderId, dishId, quantity).subscribe({
                next: resolve,
                error: (err) => {
                  console.error(`❌ Error al agregar plato ${dish.name} (ID ${dishId}):`, err);
                  reject(err);
                }
              });
            })
          );
        });

        // Esperar a que todos los platos se agreguen
        // Ejecuta secuencialmente las peticiones en vez de en paralelo
        (async () => {
          try {
            for (const item of this.items.value) {
              const dishId = item.dishId;
              const quantity = item.quantity;
              if (!dishId || isNaN(dishId) || !quantity || isNaN(quantity)) continue;

              await this.orderDishService.addDishToOrder(newOrderId, dishId, quantity).toPromise();
            }

            console.log('✅ Orden y todos los platos agregados exitosamente.');
            this.form.setControl('items', this.fb.array([]));
            this.form.get('tableNumber')?.reset();
            this.addDish();
            this.orderCreated.emit();
          } catch (error) {
            console.error('❌ Error al agregar uno o más platos a la orden:', error);
          }
        })();


      },
      error: (err) => {
        console.error('❌ Error al crear la orden principal:', err);
      }
    });
  }



}
