import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-homepage',
  imports: [DecimalPipe, MatButtonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  username = '';
  role = '';

  constructor(private router: Router) {}

  bossHp = 6200;
  bossMaxHp = 10000;

  get bossHpPercent(): number {
    return (this.bossHp / this.bossMaxHp) * 100;
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? 'Agent';
    this.role = localStorage.getItem('role') ?? '';
    this.bossHp = parseInt(localStorage.getItem('boss_hp') ?? '6200');
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

  goToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }

  goToBossBattle() {
    this.router.navigate(['/boss-battle']);
  }
}
