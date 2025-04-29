import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BranchesService } from '../../../core/services/branches.service';
import { Branch } from '../../../core/models/branch.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-branch-create',
  standalone: true,
  templateUrl: './branch-create.component.html',
  styleUrls: ['./branch-create.component.scss'],
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
export class BranchCreateComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private BranchesService: BranchesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  create(): void {
    if (this.form.valid) {
      this.BranchesService.create(this.form.value).subscribe({
        next: () => {
          // Sucesso -> volta para lista de Branches
          this.router.navigate(['/branches']);
        },
        error: (error) => {
          console.error('Erro ao criar branch', error);
          alert('Ocorreu um erro ao criar o branch.');
        }
      });
    }
  }
}