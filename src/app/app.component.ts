import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'remsoft-front';

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    console.log('Logout button clicked');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const authenticated = this.authService.isAuthenticated();
    return authenticated;
  }
}
