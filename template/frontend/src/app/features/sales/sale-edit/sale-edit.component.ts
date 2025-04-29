import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  selector: 'app-sale-edit',
  standalone: true,
  templateUrl: './sale-edit.component.html',
  styleUrls: ['./sale-edit.component.scss'],
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
export class SaleEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  customers: any[] = [];
  branches: any[] = [];
  products: any[] = [];

  discountMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private saleService: SaleService,
    private customerService: CustomerService,
    private branchService: BranchesService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadCustomers();
    this.loadBranches();
    this.loadProducts();
    this.loadSale();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      customerId: ['', Validators.required],
      branchId: ['', Validators.required],
      saleDate: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  addItem(itemData?: any) {
    this.items.push(this.fb.group({
      productId: [itemData?.productId || '', Validators.required],
      quantity: [itemData?.quantity || 1, Validators.required],
      unitPrice: [itemData?.unitPrice || 0, Validators.required]
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
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  loadSale() {
    this.saleService.getById(this.id).subscribe({
      next: (response) => {
        const sale = response;
        this.form.patchValue({
          customerId: sale.customerId,
          branchId: sale.branchId,
          saleDate: sale.date.substring(0, 10) // Ajuste para input type="date"
        });

        sale.items.forEach((item: any) => {
          this.addItem({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          });
        });
      },
      error: (err) => console.error('Erro ao carregar venda', err)
    });
  }

  onProductChange(index: number): void {
    const item = this.items.at(index);
    const productId = item.get('productId')?.value;
    const product = this.products.find(p => p.id === productId);
    if (product) {
      item.patchValue({ unitPrice: product.price });
    }
  }

  onQuantityChange(index: number): void {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value;

    if (quantity > 20) {
      this.errorMessage = 'Não é permitido vender mais de 20 itens idênticos.';
      this.discountMessage = '';
      return;
    }

    this.errorMessage = '';

    if (quantity >= 10 && quantity <= 20) {
      this.discountMessage = 'Você recebeu 20% de desconto por comprar entre 10 e 20 itens!';
    } else if (quantity >= 4) {
      this.discountMessage = 'Você recebeu 10% de desconto por comprar 4 ou mais itens!';
    } else {
      this.discountMessage = 'Sem desconto para compras abaixo de 4 itens.';
    }
  }

  get total(): number {
    return this.items.controls.reduce((acc, curr) => {
      const quantity = curr.get('quantity')?.value || 0;
      const price = curr.get('unitPrice')?.value || 0;

      let itemTotal = quantity * price;

      if (quantity >= 10 && quantity <= 20) {
        itemTotal *= 0.8; // 20% de desconto
      } else if (quantity >= 4) {
        itemTotal *= 0.9; // 10% de desconto
      }

      return acc + itemTotal;
    }, 0);
  }

  update(): void {
    if (this.form.valid) {
      this.saleService.update(this.id, this.form.value).subscribe({
        next: () => this.router.navigate(['/sales']),
        error: (err) => console.error('Erro ao atualizar venda', err)
      });
    }
  }
}
