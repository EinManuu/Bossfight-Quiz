import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-create-questions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-questions.html',
  styleUrl: './create-questions.css',
})
export class CreateQuestions {
  department = 'IT';
  difficulty = 'medium';
  questionText = '';
  answers = ['', '', '', ''];
  correctIndex = 0;
  explanation = '';
  imageUrl = '';

  submitting = false;
  success = false;
  error = '';

  readonly letters = ['A', 'B', 'C', 'D'];

  constructor(
    private questionsService: QuestionsService,
    private cdr: ChangeDetectorRef,
  ) {}

  submit() {
    this.error = '';
    this.success = false;

    if (!this.questionText.trim()) {
      this.error = 'Question text is required.';
      return;
    }
    if (this.answers.some(a => !a.trim())) {
      this.error = 'All four answer options are required.';
      return;
    }
    if (!this.explanation.trim()) {
      this.error = 'Explanation is required.';
      return;
    }

    this.submitting = true;
    this.cdr.detectChanges();

    this.questionsService.createQuestion({
      department: this.department,
      difficulty: this.difficulty,
      question: this.questionText,
      answers: [...this.answers],
      correct: this.correctIndex,
      explanation: this.explanation,
      image: this.imageUrl,
    }).subscribe({
      next: () => {
        this.success = true;
        this.submitting = false;
        this.reset();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to create question. Please try again.';
        this.submitting = false;
        this.cdr.detectChanges();
      },
    });
  }

  private reset() {
    this.department = 'IT';
    this.difficulty = 'medium';
    this.questionText = '';
    this.answers = ['', '', '', ''];
    this.correctIndex = 0;
    this.explanation = '';
    this.imageUrl = '';
  }
}
