import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Supplier } from '../../models/supplier.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-supplier-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './create-supplier-dialog.component.html',
  styleUrls: ['./create-supplier-dialog.component.scss']
})
export class CreateSupplierDialogComponent {
  supplier: Partial<Supplier> = {
    supplierName: '',
    contact: ''
  };

  constructor(public dialogRef: MatDialogRef<CreateSupplierDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.dialogRef.close(this.supplier);
  }
}
