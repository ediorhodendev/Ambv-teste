import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.id) {
      alert(this.id);
      this.loadProduct();
    }
  }

  loadProduct(): void {
    this.productService.getById(this.id).subscribe({
      next: (product) => {
        if (product) {
          this.form.patchValue({
            name: product.name,
            description: product.description,
            price: product.price
          });
        }
      },
      error: (err) => console.error('Erro ao carregar produto', err)
    });
  }
  
  
  update(): void {
    if (this.form.valid) {
      const updatedProduct: Product = this.form.value;
      this.productService.update(this.id, updatedProduct).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Erro ao atualizar produto', err)
      });
    }
  }
}
