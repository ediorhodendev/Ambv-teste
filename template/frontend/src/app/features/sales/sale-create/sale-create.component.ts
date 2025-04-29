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
  total = 0; // <<<<<<<<<<<<<<<<<<<<<< ADICIONADO AQUI
  
  discountMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private customerService: CustomerService,
    private branchService: BranchesService,
    private productService: ProductService,
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
    const itemGroup = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, Validators.required]
    });

    itemGroup.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

    this.items.push(itemGroup);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotal();
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
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  onProductChange(index: number) {
    const selectedProductId = this.items.at(index).get('productId')?.value;
    const selectedProduct = this.products.find(p => p.id === selectedProductId);
    if (selectedProduct) {
      this.items.at(index).patchValue({ unitPrice: selectedProduct.price });
    }
    this.calculateTotal();
  }

  onQuantityChange(index: number) {
    const quantity = this.items.at(index).get('quantity')?.value || 0;

    if (quantity > 20) {
      this.errorMessage = 'Não é permitido vender mais de 20 unidades do mesmo produto.';
      this.discountMessage = '';
    } else if (quantity >= 10) {
      this.discountMessage = 'Desconto de 20% aplicado!';
      this.errorMessage = '';
    } else if (quantity >= 4) {
      this.discountMessage = 'Desconto de 10% aplicado!';
      this.errorMessage = '';
    } else {
      this.discountMessage = 'Sem desconto para menos de 4 itens.';
      this.errorMessage = '';
    }
    
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    this.items.controls.forEach(item => {
      const quantity = item.get('quantity')?.value || 0;
      let unitPrice = item.get('unitPrice')?.value || 0;
      let discount = 0;

      if (quantity >= 10 && quantity <= 20) {
        discount = 0.20;
      } else if (quantity >= 4) {
        discount = 0.10;
      }

      const discountedPrice = unitPrice * (1 - discount);
      total += discountedPrice * quantity;
    });

    this.total = total;
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
