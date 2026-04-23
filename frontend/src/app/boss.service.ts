import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BossState {
  id: number;
  name: string;
  description: string;
  currentHp: number;
  maxHp: number;
}

@Injectable({ providedIn: 'root' })
export class BossService {
  private apiUrl = 'http://localhost:8000/api/boss';

  constructor(private http: HttpClient) {}

  getState(): Observable<BossState> {
    return this.http.get<BossState>(`${this.apiUrl}/state/`);
  }

  updateHp(currentHp: number): Observable<BossState> {
    return this.http.patch<BossState>(`${this.apiUrl}/state/`, { currentHp });
  }

  connectWs(): Observable<number> {
    return new Observable(observer => {
      const ws = new WebSocket('ws://localhost:8000/ws/boss/');
      ws.onmessage = (event) => observer.next(JSON.parse(event.data).currentHp);
      ws.onerror = () => observer.error('WebSocket error');
      ws.onclose = () => observer.complete();
      return () => ws.close();
    });
  }
}
