import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

export interface BossState {
  id: number;
  name: string;
  description: string;
  currentHp: number;
  maxHp: number;
}

@Injectable({ providedIn: 'root' })
export class BossService {
  private apiUrl = `${environment.apiUrl}/boss`;

  constructor(private http: HttpClient) {}

  getState(): Observable<BossState> {
    return this.http.get<BossState>(`${this.apiUrl}/state/`);
  }

  updateHp(currentHp: number): Observable<BossState> {
    return this.http.patch<BossState>(`${this.apiUrl}/state/`, { currentHp });
  }

  createBoss(data: { name: string; description: string; maxHp: number }): Observable<BossState> {
    return this.http.post<BossState>(`${this.apiUrl}/create/`, data);
  }

  connectWs(): Observable<number> {
    return new Observable(observer => {
      const ws = new WebSocket(`${environment.wsUrl}/boss/`);
      ws.onmessage = (event) => observer.next(JSON.parse(event.data).currentHp);
      ws.onerror = () => observer.error('WebSocket error');
      ws.onclose = () => observer.complete();
      return () => ws.close();
    });
  }
}
