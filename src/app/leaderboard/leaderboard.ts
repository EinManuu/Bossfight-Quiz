import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import seed from './leaderboard-seed.json';

interface Entry {
  username: string;
  role: string;
  quizPoints: number;
  bossDamage: number;
  total: number;
}

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard implements OnInit {
  entries: Entry[] = [];
  currentUser = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem('username') ?? '';

    this.entries = seed.map((s) => {
      const saved = localStorage.getItem(`score_${s.username}`);
      const live = saved ? JSON.parse(saved) : null;
      const quizPoints = live ? live.quizPoints : s.quizPoints;
      const bossDamage = live ? live.bossDamage : s.bossDamage;
      return {
        username: s.username,
        role: s.role,
        quizPoints,
        bossDamage,
        total: quizPoints + bossDamage,
      };
    });

    this.entries.sort((a, b) => b.total - a.total);
  }

  medal(index: number): string {
    return ['🥇', '🥈', '🥉'][index] ?? '';
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
