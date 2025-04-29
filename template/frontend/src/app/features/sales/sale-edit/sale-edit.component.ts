import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SaleService } from '../../../core/services/sales.service';
import { CustomerService } from '../../../core/services/customers.service';
import { BranchesService } from '../../../core/services/branches.service';
import { Customer } from '../../../core/models/customer.model';
import { Branch } from '../../../core/models/branch.model';

@Component({
  selector: 'app-sale-edit',
  standalone: true,
  templateUrl: './sale-edit.component.html',
  styleUrls: ['./sale-edit.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class SaleEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  customers: Customer[] = [];
  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private saleService: SaleService,
    private customerService: CustomerService,
    private branchService: BranchesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadSale();
    this.loadCustomers();
    this.loadBranches();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      customerId: ['', Validators.required],
      branchId: ['', Validators.required],
      saleDate: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      cancelled: [false]
    });
  }

  loadSale(): void {
    this.saleService.getById(this.id).subscribe({
      next: (sale) => {
        this.form.patchValue({
          customerId: sale.customerId,
          branchId: sale.branchId,
          saleDate: this.formatDateForInput(sale.date),
          total: sale.total,
          cancelled: sale.cancelled
        });
      },
      error: (err) => console.error('Erro ao carregar venda', err)
    });
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (customers) => this.customers = customers,
      error: (err) => console.error('Erro ao carregar clientes', err)
    });
  }

  loadBranches(): void {
    this.branchService.getAll().subscribe({
      next: (branches) => this.branches = branches,
      error: (err) => console.error('Erro ao carregar filiais', err)
    });
  }

  update(): void {
    if (this.form.valid) {
      const updatedSale = this.form.value;
      this.saleService.update(this.id, updatedSale).subscribe({
        next: () => this.router.navigate(['/sales']),
        error: (err) => console.error('Erro ao atualizar venda', err)
      });
    }
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10); // Formato yyyy-MM-dd
  }
}
