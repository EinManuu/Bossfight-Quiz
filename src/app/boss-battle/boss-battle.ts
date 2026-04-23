import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import allQuestions from '../solo-quiz/questions.json';

interface Question {
  id: number;
  department: string;
  difficulty: string;
  image?: string;
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
}

type BossState = 'question' | 'feedback' | 'results';

const BOSS_MAX_HP = 10000;
const BOSS_INITIAL_HP = 6200;
const DAMAGE_PER_HIT: Record<string, number> = { easy: 200, medium: 350, hard: 500 };
const QUESTIONS_PER_BATTLE = 5;
const TIMER_SECONDS = 20;

@Component({
  selector: 'app-boss-battle',
  imports: [DecimalPipe],
  templateUrl: './boss-battle.html',
  styleUrl: './boss-battle.css',
})
export class BossBattle implements OnInit, OnDestroy {
  questions: Question[] = [];
  current = 0;
  selected: number | null = null;
  state: BossState = 'question';

  bossHp = BOSS_INITIAL_HP;
  bossMaxHp = BOSS_MAX_HP;
  sessionDamage = 0;
  lastHit = 0;
  showDamage = false;
  bossAttacking = false;

  timer = TIMER_SECONDS;
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  get question(): Question { return this.questions[this.current]; }
  get bossHpPercent(): number { return (this.bossHp / this.bossMaxHp) * 100; }
  get progress(): number { return ((this.current + 1) / this.questions.length) * 100; }

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.bossHp = parseInt(localStorage.getItem('boss_hp') ?? String(BOSS_INITIAL_HP));
    const pool = (allQuestions as Question[]).filter(q => q.difficulty !== 'easy');
    this.questions = this.shuffle(pool).slice(0, QUESTIONS_PER_BATTLE);
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private startTimer() {
    this.timer = TIMER_SECONDS;
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.cdr.detectChanges();
      if (this.timer <= 0) {
        this.clearTimer();
        this.handleTimeout();
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private handleTimeout() {
    this.selected = -1;
    this.state = 'feedback';
    this.triggerBossAttack();
  }

  select(index: number) {
    if (this.state !== 'question') return;
    this.clearTimer();
    this.selected = index;
    this.state = 'feedback';

    if (index === this.question.correct) {
      const dmg = DAMAGE_PER_HIT[this.question.difficulty] ?? 200;
      this.lastHit = dmg;
      this.sessionDamage += dmg;
      this.bossHp = Math.max(0, this.bossHp - dmg);
      this.triggerDamage();
    } else {
      this.bossHp = Math.min(BOSS_MAX_HP, this.bossHp + 75);
      this.triggerBossAttack();
    }
  }

  next() {
    if (this.current < this.questions.length - 1) {
      this.current++;
      this.selected = null;
      this.state = 'question';
      this.startTimer();
    } else {
      this.saveProgress();
      this.state = 'results';
    }
  }

  private saveProgress() {
    localStorage.setItem('boss_hp', String(this.bossHp));
    const username = localStorage.getItem('username') ?? '';
    if (!username) return;
    const key = `score_${username}`;
    const existing = JSON.parse(localStorage.getItem(key) ?? '{"quizPoints":0,"bossDamage":0}');
    existing.bossDamage += this.sessionDamage;
    localStorage.setItem(key, JSON.stringify(existing));
  }

  private triggerDamage() {
    this.showDamage = true;
    this.cdr.detectChanges();
    setTimeout(() => { this.showDamage = false; this.cdr.detectChanges(); }, 1200);
  }

  private triggerBossAttack() {
    this.bossAttacking = true;
    this.cdr.detectChanges();
    setTimeout(() => { this.bossAttacking = false; this.cdr.detectChanges(); }, 600);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  get timerColor(): string {
    if (this.timer > 10) return '#4ade80';
    if (this.timer > 5) return '#fbbf24';
    return '#f87171';
  }

  get timerPercent(): number {
    return (this.timer / TIMER_SECONDS) * 100;
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
