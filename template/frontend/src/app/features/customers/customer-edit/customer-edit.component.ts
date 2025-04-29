import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
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
export class CustomerEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadCustomer();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  loadCustomer(): void {
    this.customerService.getById(this.id).subscribe({
      next: (customer: Customer) => {
        this.form.patchValue(customer);
      },
      error: (err) => console.error('Erro ao carregar cliente', err)
    });
  }

  update(): void {
    if (this.form.valid) {
      const updatedCustomer: Customer = this.form.value;
      this.customerService.update(this.id, updatedCustomer).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: (err) => console.error('Erro ao atualizar cliente', err)
      });
    }
  }
}
