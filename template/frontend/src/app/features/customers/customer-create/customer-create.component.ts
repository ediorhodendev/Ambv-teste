import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- IMPORTA
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/models/customer.model';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class CustomerCreateComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  create(): void {
    if (this.form.valid) {
      this.customerService.create(this.form.value).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: (error) => console.error('Erro ao criar cliente', error)
      });
    }
  }
}