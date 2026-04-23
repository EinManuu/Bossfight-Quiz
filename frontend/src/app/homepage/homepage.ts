import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
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
export class Homepage implements OnInit, OnDestroy {
  username = '';
  role = '';
  bossHp = 0;
  bossMaxHp = 10000;
  bossName = '';
  bossDescription = '';

  private wsSubscription?: Subscription;

  showDamage = false;
  lastHit = 0;
  isHeal = false;

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

    this.wsSubscription = this.bossService.connectWs().subscribe({
      next: (hp) => {
        const diff = this.bossHp - hp;
        if (diff !== 0) {
          this.lastHit = Math.abs(diff);
          this.isHeal = diff < 0;
          this.triggerDamagePop();
        }
        this.bossHp = hp;
        this.cdr.detectChanges();
      },
    });
  }

  ngOnDestroy() {
    this.wsSubscription?.unsubscribe();
  }

  private triggerDamagePop() {
    this.showDamage = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.showDamage = false;
      this.cdr.detectChanges();
    }, 1200);
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
