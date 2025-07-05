import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.entity';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,          // ✅ translate pipe
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule
  ],
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {
  today: string = new Date().toISOString().split('T')[0];
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
    this.productService.getProducts().subscribe((productsFromApi: any[]) => {
      this.products = productsFromApi.map(p => ({
        productId: p.productItemId,
        name: p.name,
        expirationDate: p.expirationDate.expirationDate, // ✅ desanidado
        quantity: p.quantity.quantity,                    // ✅ desanidado
        price: p.price.price                              // ✅ desanidado
      }));
    });
  }


  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;

    const payload = {
      name: formValue.name,
      expirationDate: formValue.expiration_date, // 👈 flat
      quantity: formValue.stock,                 // 👈 flat
      price: formValue.price                     // 👈 flat
    };

    this.productService.addProduct(payload).subscribe({
      next: () => {
        this.loadProducts();
        this.productForm.reset();
      },
      error: err => console.error('Error al agregar producto:', err)
    });
  }
}
