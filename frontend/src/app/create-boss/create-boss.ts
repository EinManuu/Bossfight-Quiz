import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { BossService, BossState } from '../boss.service';

@Component({
  selector: 'app-create-boss',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './create-boss.html',
  styleUrl: './create-boss.css',
})
export class CreateBoss implements OnInit {
  name = '';
  description = '';
  maxHp = 10000;

  currentBoss: BossState | null = null;
  submitting = false;
  success = false;
  error = '';

  constructor(
    private bossService: BossService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.bossService.getState().subscribe({
      next: (boss) => {
        this.currentBoss = boss;
        this.cdr.detectChanges();
      },
      error: () => {
        this.currentBoss = null;
        this.cdr.detectChanges();
      },
    });
  }

  get hpPercent(): number {
    if (!this.currentBoss) return 0;
    return (this.currentBoss.currentHp / this.currentBoss.maxHp) * 100;
  }

  submit() {
    this.error = '';
    this.success = false;

    if (!this.name.trim()) {
      this.error = 'Boss name is required.';
      return;
    }
    if (this.maxHp < 100) {
      this.error = 'Max HP must be at least 100.';
      return;
    }

    this.submitting = true;
    this.cdr.detectChanges();

    this.bossService.createBoss({
      name: this.name,
      description: this.description,
      maxHp: this.maxHp,
    }).subscribe({
      next: (boss) => {
        this.currentBoss = boss;
        this.success = true;
        this.submitting = false;
        this.name = '';
        this.description = '';
        this.maxHp = 10000;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to create boss. Please try again.';
        this.submitting = false;
        this.cdr.detectChanges();
      },
    });
  }
}
