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

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private branchesService: BranchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchesService.getAll().subscribe({
      next: (data) => this.branches = data,
      error: (err) => console.error('Erro ao carregar filiais', err)
    });
  }

  deleteBranch(id: string): void {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.branchesService.delete(id).subscribe({
        next: () => this.loadBranches(),
        error: (err) => console.error('Erro ao deletar filial', err)
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

  // Paginação
  get totalPages(): number {
    return Math.ceil(this.branches.length / this.pageSize);
  }

  get pagedBranches(): Branch[] {
    const start = this.pageIndex * this.pageSize;
    return this.branches.slice(start, start + this.pageSize);
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
