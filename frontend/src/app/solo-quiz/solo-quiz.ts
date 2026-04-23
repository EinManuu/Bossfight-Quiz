import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService, Question } from '../questions.service';
import { ScoresService } from '../scores.service';

type QuizState = 'question' | 'feedback' | 'results' | 'levelup';

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
  loading = true;
  newLevel = 0;

  get question(): Question {
    return this.questions[this.current];
  }

  get progress(): number {
    if (!this.questions.length) return 0;
    return ((this.current + 1) / this.questions.length) * 100;
  }

  get xpEarned(): number {
    return this.score * 10;
  }

  constructor(
    private router: Router,
    private questionsService: QuestionsService,
    private scoresService: ScoresService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const role = localStorage.getItem('role') ?? '';
    this.questionsService.getByDepartment(role).subscribe({
      next: (all) => {
        this.questions = this.shuffle(all).slice(0, 10);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => this.router.navigate(['/home']),
    });
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
    }
  }

  private saveScore() {
    const xp = this.xpEarned;
    this.scoresService.addScore(xp).subscribe({
      next: (stats) => {
        const oldPoints = stats.quizPoints - xp;
        const oldLevel = Math.floor(oldPoints / 100);
        const newLevel = Math.floor(stats.quizPoints / 100);
        if (newLevel > oldLevel && newLevel > 0) {
          this.newLevel = newLevel;
          this.state = 'levelup';
        } else {
          this.state = 'results';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.state = 'results';
        this.cdr.detectChanges();
      },
    });
  }

  chooseUpgrade(upgrade: string) {
    this.scoresService.saveUpgrade(upgrade).subscribe({
      next: () => {
        this.state = 'results';
        this.cdr.detectChanges();
      },
      error: () => {
        this.state = 'results';
        this.cdr.detectChanges();
      },
    });
  }

  restart() {
    const role = localStorage.getItem('role') ?? '';
    this.loading = true;
    this.questionsService.getByDepartment(role).subscribe({
      next: (all) => {
        this.questions = this.shuffle(all).slice(0, 10);
        this.current = 0;
        this.selected = null;
        this.score = 0;
        this.state = 'question';
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => this.router.navigate(['/home']),
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
