import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BranchListComponent } from './features/branches/branch-list/branch-list.component';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { SaleListComponent } from './features/sales/sale-list/sale-list.component';



export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'branches', loadComponent: () => import('./features/branches/branch-list/branch-list.component').then(m => m.BranchListComponent) },
  { path: 'branches/create', loadComponent: () => import('./features/branches/branch-create/branch-create.component').then(m => m.BranchCreateComponent) },
  { path: 'branches/edit/:id', loadComponent: () => import('./features/branches/branch-edit/branch-edit.component').then(m => m.BranchEditComponent) },
  { path: 'branches/details/:id', loadComponent: () => import('./features/branches/branch-details/branch-details.component').then(m => m.BranchDetailsComponent) },
  
  { path: 'customers', loadComponent: () => import('./features/customers/customer-list/customer-list.component').then(m => m.CustomerListComponent) },
  { path: 'customers/create', loadComponent: () => import('./features/customers/customer-create/customer-create.component').then(m => m.CustomerCreateComponent) },
  { path: 'customers/edit/:id', loadComponent: () => import('./features/customers/customer-edit/customer-edit.component').then(m => m.CustomerEditComponent) },
  { path: 'customers/details/:id', loadComponent: () => import('./features/customers/customer-details/customer-details.component').then(m => m.CustomerDetailsComponent) },
  
  { path: 'products', loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'products/create', loadComponent: () => import('./features/products/product-create/product-create.component').then(m => m.ProductCreateComponent) },
  { path: 'products/edit/:id', loadComponent: () => import('./features/products/product-edit/product-edit.component').then(m => m.ProductEditComponent) },
  { path: 'products/details/:id', loadComponent: () => import('./features/products/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  
  { path: 'sales', loadComponent: () => import('./features/sales/sale-list/sale-list.component').then(m => m.SaleListComponent) },
  { path: 'sales/create', loadComponent: () => import('./features/sales/sale-create/sale-create.component').then(m => m.SaleCreateComponent) },
  { path: 'sales/edit/:id', loadComponent: () => import('./features/sales/sale-edit/sale-edit.component').then(m => m.SaleEditComponent) },
  { path: 'sales/details/:id', loadComponent: () => import('./features/sales/sale-details/sale-details.component').then(m => m.SaleDetailsComponent) },
  
  { path: '**', redirectTo: '' },
];

