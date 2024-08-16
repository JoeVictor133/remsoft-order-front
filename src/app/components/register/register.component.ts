import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Registration response:', response.message);
        this.snackBar.open(response.message, 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 409) {
          this.snackBar.open('Username already taken', 'Close', {
            duration: 3000,
          });
        } else {
          console.error('Registration error', error);
          this.snackBar.open('Registration failed', 'Close', {
            duration: 3000,
          });
        }
      }
    });
  }



  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
