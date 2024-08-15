import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoginMode: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      const success = this.authService.login(this.username, this.password);
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    } else {
      const success = this.authService.register(this.username, this.password);
      if (success) {
        this.authService.login(this.username, this.password);
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Username already exists';
      }
    }
  }
}