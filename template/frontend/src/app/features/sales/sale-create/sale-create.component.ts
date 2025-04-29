import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { SaleService } from '../../../core/services/sales.service';
import { CustomerService } from '../../../core/services/customers.service';
import { BranchesService } from '../../../core/services/branches.service';
import { ProductService } from '../../../core/services/products.service';



@Component({
  selector: 'app-sale-create',
  standalone: true,
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class SaleCreateComponent implements OnInit {
  form!: FormGroup;
  customers: any[] = [];
  branches: any[] = [];
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private customerService: CustomerService,
    private branchService: BranchesService,
    private ProductService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customerId: ['', Validators.required],
      branchId: ['', Validators.required],
      saleDate: ['', Validators.required],
      items: this.fb.array([])
    });

    this.loadCustomers();
    this.loadBranches();
    this.loadProducts();
    this.addItem();
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, Validators.required],
      unitPrice: [0, Validators.required]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Erro ao carregar customers', err)
    });
  }

  loadBranches() {
    this.branchService.getAll().subscribe({
      next: (data) => this.branches = data,
      error: (err) => console.error('Erro ao carregar branches', err)
    });
  }

  loadProducts() {
    this.ProductService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  create() {
    if (this.form.valid) {
      this.saleService.create(this.form.value).subscribe({
        next: () => this.router.navigate(['/sales']),
        error: (err) => console.error('Erro ao criar venda', err)
      });
    }
  }
}
