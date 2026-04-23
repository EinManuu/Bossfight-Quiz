import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';
import { BossService } from '../boss.service';
import { QuestionsService, Question } from '../questions.service';
import { ScoresService } from '../scores.service';

type BossState = 'loading' | 'question' | 'feedback' | 'results';

const QUESTIONS_PER_BATTLE = 5;
const TIMER_SECONDS = 20;
const BASE_DAMAGE: Record<string, number> = { easy: 200, medium: 350, hard: 500 };

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
  state: BossState = 'loading';

  bossHp = 0;
  bossMaxHp = 10000;
  bossName = '';
  sessionDamage = 0;

  lastHit = 0;
  showDamage = false;
  isHeal = false;

  bossAttacking = false;
  playerUpgrade = '';

  timer = TIMER_SECONDS;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private wsSubscription?: Subscription;

  private localHitPending = false;

  get question(): Question { return this.questions[this.current]; }
  get bossHpPercent(): number { return (this.bossHp / this.bossMaxHp) * 100; }
  get progress(): number {
    return this.questions.length
      ? ((this.current + 1) / this.questions.length) * 100
      : 0;
  }

  constructor(
    private router: Router,
    private bossService: BossService,
    private questionsService: QuestionsService,
    private scoresService: ScoresService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.wsSubscription = this.bossService.connectWs().subscribe({
      next: (hp) => {
        if (this.state !== 'results') {
          const prevHp = this.bossHp;
          this.bossHp = hp;

          const diff = prevHp - hp;

          if (diff !== 0) {
            this.lastHit = Math.abs(diff);
            this.isHeal = diff < 0;

            if (!this.localHitPending) {
              this.triggerEffect();
            } else {
              this.localHitPending = false;
            }
          }

          this.cdr.detectChanges();
        }
      },
    });

    forkJoin({
      boss: this.bossService.getState(),
      questions: this.questionsService.getBossQuestions(),
      stats: this.scoresService.getStats(),
    }).subscribe({
      next: ({ boss, questions, stats }) => {
        this.bossHp = boss.currentHp;
        this.bossMaxHp = boss.maxHp;
        this.bossName = boss.name;
        this.playerUpgrade = stats.upgrade ?? '';
        this.questions = this.shuffle(questions).slice(0, QUESTIONS_PER_BATTLE);

        this.state = 'question';
        this.cdr.detectChanges();
        this.startTimer();
      },
      error: () => this.router.navigate(['/home']),
    });
  }

  ngOnDestroy() {
    this.clearTimer();
    this.wsSubscription?.unsubscribe();
  }

  private applyUpgrade(baseDamage: number): number {
    switch (this.playerUpgrade) {
      case 'power':   return Math.floor(baseDamage * 1.5);
      case 'exploit': return baseDamage + 200;
      case 'zeroday': return this.question.difficulty === 'hard' ? baseDamage * 2 : baseDamage;
      default:        return baseDamage;
    }
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

    this.isHeal = true;
    this.lastHit = 75;
    this.localHitPending = true;

    this.triggerEffect();
    this.triggerBossAttack();
  }

  select(index: number) {
    if (this.state !== 'question') return;

    this.clearTimer();
    this.selected = index;
    this.state = 'feedback';

    if (index === this.question.correct) {
      const base = BASE_DAMAGE[this.question.difficulty] ?? 200;
      const dmg = this.applyUpgrade(base);

      this.isHeal = false;
      this.lastHit = dmg;
      this.sessionDamage += dmg;

      this.localHitPending = true;

      this.bossHp = Math.max(0, this.bossHp - dmg);
      this.bossService.updateHp(this.bossHp).subscribe();

      this.triggerEffect();
    } else {
      this.isHeal = true;
      this.lastHit = 75;

      this.localHitPending = true;

      this.bossHp = Math.min(this.bossMaxHp, this.bossHp + 75);
      this.bossService.updateHp(this.bossHp).subscribe();

      this.triggerEffect();
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
    if (this.sessionDamage > 0) {
      this.scoresService.addScore(0, this.sessionDamage).subscribe();
    }
  }

  private triggerEffect() {
    this.showDamage = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showDamage = false;
      this.cdr.detectChanges();
    }, 1200);
  }

  private triggerBossAttack() {
    this.bossAttacking = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.bossAttacking = false;
      this.cdr.detectChanges();
    }, 600);
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