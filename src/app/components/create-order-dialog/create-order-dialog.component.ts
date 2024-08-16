import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { SupplierService } from '../../services/supplier.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Supplier } from '../../models/supplier.model';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-order-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit {
  order: Partial<Order> = {
    buyerName: '',
    supplier: { id: 0, supplierName: '', contact: '' },
    products: []
  };

  suppliers: Supplier[] = [];
  products: Product[] = [];
  selectedProducts: Product[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>,
    private supplierService: SupplierService,
    private productService: ProductService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadProducts();
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe((data: Supplier[]) => {
      this.suppliers = data;
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  onProductsChange(selectedProducts: Product[]): void {
    this.selectedProducts = selectedProducts;
    this.order.products = this.selectedProducts;
  }

  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.updateOrderProducts();
  }

  updateOrderProducts(): void {
    this.order.products = this.selectedProducts;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.order.buyerName && this.order.supplier && this.order.products?.length) {
      this.orderService.createOrder(this.order as Order).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error deleting order:', error);
          this.snackBar.open('Failed to delete order', 'Close', {
            duration: 3000,
          });
        },
        complete: () => {
          console.log('Order creation completed.');
        }
      });
    }
  }

}
