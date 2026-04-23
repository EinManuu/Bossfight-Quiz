import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ScoresService, LeaderboardEntry } from '../scores.service';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard implements OnInit {
  entries: LeaderboardEntry[] = [];
  currentUser = '';
  loading = true;

  constructor(
    private router: Router,
    private scoresService: ScoresService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem('username') ?? '';
    this.scoresService.getLeaderboard().subscribe({
      next: (data) => {
        this.entries = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => this.router.navigate(['/home']),
    });
  }

  medal(index: number): string {
    return ['🥇', '🥈', '🥉'][index] ?? '';
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
