import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.entity';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-inventory-table',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TranslatePipe,
  ],
  templateUrl: './inventory-table.component.html',
  standalone: true,
  styleUrl: './inventory-table.component.css'
})
export class InventoryTableComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      inventory_id: [null, Validators.required],
      name: ['', Validators.required],
      expiration_date: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      measurement_unit: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;

    // Aquí NO asignamos 'id' manualmente
    const newProduct = {
      // id: no enviamos nada
      inventory_id: formValue.inventory_id,
      name: formValue.name,
      expiration_date: formValue.expiration_date,
      stock: formValue.stock,
      measurement_unit: formValue.measurement_unit,
      price: formValue.price
    };

    this.productService.addProduct(newProduct as any).subscribe({
      next: (added) => {
        this.products.push(added);
        this.productForm.reset();
      },
      error: (err) => {
        console.error("Error al agregar producto:", err);
      }
    });
  }

}
