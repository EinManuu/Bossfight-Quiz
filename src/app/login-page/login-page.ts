import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import accounts from './accounts.json';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  onLogin() {
    const match = accounts.find(
      (a) => a.username === this.username && a.password === this.password
    );

    if (match) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('role', match.role);
      localStorage.setItem('username', match.username);
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid username or password.';
    }
  }
}
