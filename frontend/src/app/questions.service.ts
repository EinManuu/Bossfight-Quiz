import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8000/api/questions/';

  constructor(private http: HttpClient) {}

  getByDepartment(department: string): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl, {
      params: { department },
    });
  }

  getBossQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:8000/api/boss/questions/');
  }
}
