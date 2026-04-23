import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

export interface Question {
  id: number;
  department: string;
  difficulty: string;
  image: string;
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
}

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private apiUrl = `${environment.apiUrl}/questions/`;

  constructor(private http: HttpClient) {}

  getByDepartment(department: string): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl, {
      params: { department },
    });
  }

  getAll(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  getBossQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.apiUrl}/boss/questions/`);
  }
}
