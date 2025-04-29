import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CustomerService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class CustomerDetailsComponent implements OnInit {
  customer!: Customer;

  constructor(
    private CustomerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCustomer();
  }

  private loadCustomer(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.CustomerService.getById(id).subscribe(customer => {
      this.customer = customer;
    });
  }
}
