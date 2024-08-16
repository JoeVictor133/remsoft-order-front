import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
  ],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number },
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.orderService.deleteOrder(this.data.orderId).subscribe({
      next: () => {
        this.snackBar.open('Order deleted successfully', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error deleting order:', error);
        this.snackBar.open('Failed to delete order', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(false);
      }
    });
  }
}
