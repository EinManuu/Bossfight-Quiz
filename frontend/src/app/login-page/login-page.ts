import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout();
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => (this.error = 'Invalid username or password.'),
    });
  }
}
