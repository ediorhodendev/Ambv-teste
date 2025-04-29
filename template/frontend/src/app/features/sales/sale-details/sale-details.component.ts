import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessário para pipes como currency, date
import { MatCardModule } from '@angular/material/card'; // Necessário para usar <mat-card>
import { SaleService } from '../../../core/services/sales.service';
import { Sale } from '../../../core/models/sale.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-sale-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss']
})
export class SaleDetailsComponent implements OnInit {
  sale!: Sale;

  constructor(
    private saleService: SaleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.saleService.getById(id).subscribe(sale => {
        this.sale = sale;
      });
    }
  }
}


