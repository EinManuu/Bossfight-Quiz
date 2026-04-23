import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService, Question } from '../questions.service';
import { ScoresService } from '../scores.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
    this.loadQuestions();
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
    this.loadQuestions();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToLearningModule() {
    const topicId = this.getLearningTopicId();
    if (!topicId) {
      window.location.href = 'http://localhost:4200/study-zone';
      return;
    }

    this.router.navigate(['/study-zone'], {
      queryParams: { topic: topicId },
    });
  }

  hasLearningModule(): boolean {
    return this.getLearningTopicId() !== null;
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  private loadQuestions() {
    const role = localStorage.getItem('role') ?? '';
    this.loading = true;

    this.questionsService
      .getByDepartment(role)
      .pipe(switchMap((all) => (all.length ? of(all) : this.questionsService.getAll())))
      .subscribe({
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

  private getLearningTopicId(): string | null {
    if (!this.question) return null;

    const text = `${this.question.question} ${this.question.explanation}`.toLowerCase();

    const topicKeywords: Record<string, string[]> = {
      phishing: ['phishing', 'fake communications', 'fake email', 'spear phishing', 'whaling', 'smishing', 'vishing'],
      'social-engineering': ['social engineering', 'manipulating people', 'psychology', 'ceo fraud', 'business email compromise', 'bec'],
      ransomware: ['ransomware', 'encrypts your files', 'decryption key', 'malware that encrypts'],
      'password-attacks': ['password', 'credential stuffing', 'password spraying', 'brute-force', 'brute force', 'mfa'],
      'man-in-the-middle': ['man-in-the-middle', 'mitm', 'intercept', 'public wi-fi', 'public wifi', 'vpn'],
      'insider-threats': ['insider', 'least privilege', 'segregation of duties', 'access rights', 'compromised insider'],
      'physical-access': ['physical', 'tailgating', 'shoulder surfing', 'badge', 'restricted area'],
      'removable-media': ['usb', 'removable media', 'external drive'],
    };

    for (const [topicId, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some((keyword) => text.includes(keyword))) {
        return topicId;
      }
    }

    return null;
  }
}
