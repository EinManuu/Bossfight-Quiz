import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-homepage',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  username = '';
  role = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? 'Agent';
    this.role = localStorage.getItem('role') ?? '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  goToSoloQuiz() {
    this.router.navigate(['/solo-quiz']);
  }

  goToStudyZone() {
    this.router.navigate(['/study-zone']);
  }
}
