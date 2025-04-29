import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BranchesService } from '../../../core/services/branches.service';
import { Branch } from '../../../core/models/branch.model';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class BranchListComponent implements OnInit {
  branches: Branch[] = [];
  displayedColumns: string[] = ['name', 'location', 'actions'];

  constructor(
    private BranchesService: BranchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.BranchesService.getAll().subscribe({
      next: (data) => this.branches = data,
      error: (err: any) => console.error('Erro ao carregar filiais', err)
    });
  }

  deleteBranch(id: string): void {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.BranchesService.delete(id).subscribe({
        next: () => this.loadBranches(),
        error: (err: any) => console.error('Erro ao deletar filial', err)
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/branches/create']);
  }

  navigateToEdit(id: string): void {
    this.router.navigate(['/branches/edit', id]);
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['/branches/details', id]);
  }
}
