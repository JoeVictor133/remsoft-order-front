import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateSupplierDialogComponent } from '../create-supplier-dialog/create-supplier-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginatorModule, MatIconModule],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  paginatedSuppliers: Supplier[] = [];
  pageSize = 5;
  pageIndex = 0;

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe((data: Supplier[]) => {
      this.suppliers = data;
      this.updatePaginatedSuppliers();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedSuppliers();
  }

  private updatePaginatedSuppliers(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSuppliers = this.suppliers.slice(startIndex, endIndex);
  }

  openCreateSupplierDialog(): void {
    const dialogRef = this.dialog.open(CreateSupplierDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supplierService.createSupplier(result).subscribe({
          next: () => {
            this.snackBar.open('Supplier created successfully', 'Close', {
              duration: 3000,
            });
            this.loadSuppliers();
          },
          error: (error) => {
            console.error('Error creating supplier:', error);
            this.snackBar.open('Failed to create supplier', 'Close', {
              duration: 3000,
            });
          }
        });
      }
    });
  }
}
