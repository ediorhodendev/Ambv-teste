import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SaleService } from '../../../core/services/sales.service';
import { Sale } from '../../../core/models/sale.model';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SaleListComponent implements OnInit {
  sales: Sale[] = [];
  displayedColumns: string[] = ['customerName', 'branchName', 'date', 'cancelled', 'total', 'actions'];

  constructor(
    private saleService: SaleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getAll().subscribe({
      next: (data) => this.sales = data,
      error: (err) => console.error('Erro ao carregar vendas', err)
    });
  }

  deleteSale(id: string): void {
    if (confirm('Are you sure you want to delete this sale?')) {
      this.saleService.delete(id).subscribe({
        next: () => this.loadSales(),
        error: (err) => console.error('Erro ao deletar venda', err)
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/sales/create']);
  }

  navigateToEdit(id: string): void {
    this.router.navigate(['/sales/edit', id]);
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['/sales/details', id]);
  }
}
