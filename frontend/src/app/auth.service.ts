import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment';

interface LoginResponse {
  access: string;
  username: string;
  role: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login/`, { username, password })
      .pipe(
        tap((res) => {
          try {
            localStorage.setItem('token', res.access);
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('role', res.role);
            localStorage.setItem('username', res.username);
          } catch {
            // Storage blocked (private mode, strict privacy settings) — session won't persist
          }
        })
      );
  }

  register(username: string, role: 'IT' | 'Finance'): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/register/`, { username, role })
      .pipe(
        tap((res) => {
          try {
            localStorage.setItem('token', res.access);
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('role', res.role);
            localStorage.setItem('username', res.username);
          } catch {
            // Storage blocked (private mode, strict privacy settings) — session won't persist
          }
        })
      );
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
