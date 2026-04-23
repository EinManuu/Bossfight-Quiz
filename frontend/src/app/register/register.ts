import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  role: 'IT' | 'Finance' = 'IT';
  message = '';
  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    this.message = '';
    this.error = '';

    const username = this.username.trim();
    if (!username) {
      this.error = 'Username is required.';
      return;
    }

    if (!['IT', 'Finance'].includes(this.role)) {
      this.error = 'Please select a valid department.';
      return;
    }

    this.authService.register(username, this.role).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err?.error?.error || 'Unable to create account.';
      },
    });
  }
}
