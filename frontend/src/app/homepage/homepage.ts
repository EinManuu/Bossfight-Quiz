import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { BossService } from '../boss.service';

@Component({
  selector: 'app-homepage',
  imports: [DecimalPipe, MatButtonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  username = '';
  role = '';
  bossHp = 0;
  bossMaxHp = 10000;
  bossName = '';
  bossDescription = '';

  get bossHpPercent(): number {
    return (this.bossHp / this.bossMaxHp) * 100;
  }

  constructor(
    private router: Router,
    private bossService: BossService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? 'Agent';
    this.role = localStorage.getItem('role') ?? '';
    this.bossService.getState().subscribe({
      next: (state) => {
        this.bossHp = state.currentHp;
        this.bossMaxHp = state.maxHp;
        this.bossName = state.name;
        this.bossDescription = state.description;
        this.cdr.detectChanges();
      },
    });
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

  goToAdminPanel() {
    this.router.navigate(['/admin-panel']);
  }

  protected readonly localStorage = localStorage;
}
