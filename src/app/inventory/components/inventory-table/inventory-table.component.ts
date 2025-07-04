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
      name: ['', Validators.required],
      expiration_date: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
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

    const createProductDto = {
      name: formValue.name,
      quantity: Number(formValue.stock),
      expirationDate: new Date(formValue.expiration_date).toISOString().split('T')[0], // yyyy-MM-dd
      price: Number(formValue.price)
    };

    this.productService.addProduct(createProductDto as any).subscribe({
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
