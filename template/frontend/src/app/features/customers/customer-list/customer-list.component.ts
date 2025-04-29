import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { CustomerService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Erro ao carregar clientes', err)
    });
  }

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.delete(id).subscribe({
        next: () => this.loadCustomers(),
        error: (err) => console.error('Erro ao deletar cliente', err)
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/customers/create']);
  }

  navigateToEdit(id: string): void {
    this.router.navigate(['/customers/edit', id]);
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['/customers/details', id]);
  }

  get totalPages(): number {
    return Math.ceil(this.customers.length / this.pageSize);
  }

  get pagedCustomers(): Customer[] {
    const start = this.pageIndex * this.pageSize;
    return this.customers.slice(start, start + this.pageSize);
  }

  prevPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
    }
  }
}
