import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BranchesService } from '../../../core/services/branches.service';
import { Branch } from '../../../core/models/branch.model';

@Component({
  selector: 'app-branch-details',
  standalone: true,
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule
  ]
})
export class BranchDetailsComponent implements OnInit {
  branch!: Branch;

  constructor(
    private BranchesService: BranchesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.BranchesService.getById(id).subscribe((branch: Branch) => {
      this.branch = branch;
    });
  }
}
