import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import allQuestions from './questions.json';

interface Question {
  id: number;
  department: string;
  difficulty: string;
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
}

type QuizState = 'question' | 'feedback' | 'results';

@Component({
  selector: 'app-solo-quiz',
  imports: [],
  templateUrl: './solo-quiz.html',
  styleUrl: './solo-quiz.css',
})
export class SoloQuiz implements OnInit {
  questions: Question[] = [];
  current = 0;
  selected: number | null = null;
  score = 0;
  state: QuizState = 'question';

  get question(): Question {
    return this.questions[this.current];
  }

  get progress(): number {
    return ((this.current + 1) / this.questions.length) * 100;
  }

  get xpEarned(): number {
    return this.score * 10;
  }

  constructor(private router: Router) {}

  ngOnInit() {
    const role = localStorage.getItem('role') ?? '';
    const pool = allQuestions.filter(
      (q) => q.department.toLowerCase() === role.toLowerCase()
    );
    this.questions = this.shuffle(pool).slice(0, 10);
  }

  select(index: number) {
    if (this.state !== 'question') return;
    this.selected = index;
    this.state = 'feedback';
    if (index === this.question.correct) {
      this.score++;
    }
  }

  next() {
    if (this.current < this.questions.length - 1) {
      this.current++;
      this.selected = null;
      this.state = 'question';
    } else {
      this.saveScore();
      this.state = 'results';
    }
  }

  private saveScore() {
    const username = localStorage.getItem('username') ?? '';
    if (!username) return;
    const key = `score_${username}`;
    const existing = JSON.parse(localStorage.getItem(key) ?? '{"quizPoints":0,"bossDamage":0}');
    existing.quizPoints += this.xpEarned;
    localStorage.setItem(key, JSON.stringify(existing));
  }

  restart() {
    const role = localStorage.getItem('role') ?? '';
    const pool = (allQuestions as Question[]).filter(
      (q) => q.department.toLowerCase() === role.toLowerCase()
    );
    this.questions = this.shuffle(pool).slice(0, 10);
    this.current = 0;
    this.selected = null;
    this.score = 0;
    this.state = 'question';
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
