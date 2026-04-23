import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

export interface LeaderboardEntry {
  username: string;
  role: string;
  quizPoints: number;
  bossDamage: number;
  total: number;
}

export interface PlayerStats {
  quizPoints: number;
  bossDamage: number;
  total: number;
  level: number;
  upgrade: string;
}

@Injectable({ providedIn: 'root' })
export class ScoresService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(`${this.apiUrl}/leaderboard/`);
  }

  addScore(quizPoints: number, bossDamage: number = 0): Observable<PlayerStats> {
    return this.http.post<PlayerStats>(`${this.apiUrl}/scores/add/`, { quizPoints, bossDamage });
  }

  saveUpgrade(upgrade: string): Observable<{ upgrade: string }> {
    return this.http.patch<{ upgrade: string }>(`${this.apiUrl}/scores/upgrade/`, { upgrade });
  }

  getStats(): Observable<PlayerStats> {
    return this.http.get<PlayerStats>(`${this.apiUrl}/scores/stats/`);
  }
}
