import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BranchesService } from '../../../core/services/branches.service';
import { Branch } from '../../../core/models/branch.model';

@Component({
  selector: 'app-branch-edit',
  standalone: true,
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.scss'],
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
export class BranchEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private branchesService: BranchesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadBranch();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  
    loadBranch(): void {
      this.branchesService.getById(this.id).subscribe({
        next: (branch: Branch) => {
          this.form.patchValue({
            name: branch.name,
            location: branch.location
          });
        },
        error: (err) => console.error('Erro ao carregar branch', err)
      });
    }
    

  update(): void {
    if (this.form.valid) {
      const updatedBranch: Branch = this.form.value;
      this.branchesService.update(this.id, updatedBranch).subscribe({
        next: () => this.router.navigate(['/branches']),
        error: (err) => console.error('Erro ao atualizar filial', err)
      });
    }
  }
}
