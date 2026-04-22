import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type QuizQuestion = {
  category: string;
  prompt: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

type AnswerResult = {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

@Component({
  selector: 'app-solo-quiz',
  imports: [FormsModule],
  templateUrl: './solo-quiz.html',
  styleUrl: './solo-quiz.css',
})
export class SoloQuiz {
  readonly questions: QuizQuestion[] = [
    {
      category: 'JavaScript',
      prompt: 'What is the output of: console.log(typeof null)?',
      options: [
        'null',
        'undefined',
        'object',
        'number',
      ],
      correctAnswerIndex: 2,
      explanation:
        'typeof null returns "object" because of a historical JavaScript behavior kept for compatibility.',
    },
    {
      category: 'JavaScript',
      prompt: 'What does the spread operator do?',
      options: [
        'Divides numbers',
        'Expands iterables',
        'Multiplies arrays',
        'Removes duplicates',
      ],
      correctAnswerIndex: 1,
      explanation:
        'The spread operator expands arrays, objects, and other iterables into their individual elements.',
    },
    {
      category: 'React',
      prompt: 'What hook is used for side effects in React?',
      options: [
        'useState',
        'useEffect',
        'useContext',
        'useMemo',
      ],
      correctAnswerIndex: 1,
      explanation:
        'useEffect runs side effects such as fetching data, subscriptions, and DOM-related work.',
    },
    {
      category: 'React',
      prompt: 'What is a component?',
      options: [
        'A reusable piece of UI',
        'A database table',
        'A package manager',
        'A browser setting',
      ],
      correctAnswerIndex: 0,
      explanation:
        'React components are reusable functions or classes that describe part of the interface.',
    },
    {
      category: 'TypeScript',
      prompt: 'What does a type annotation help with?',
      options: [
        'Runtime animation speed',
        'Static checking and editor feedback',
        'Changing CSS colors',
        'Deploying the app',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Type annotations help TypeScript catch mistakes before runtime and improve editor tooling.',
    },
  ];

  playerName = '';
  selectedCategory = '';
  quizStarted = false;
  currentQuestionIndex = 0;
  selectedAnswerIndex: number | null = null;
  score = 0;
  streak = 0;
  bestStreak = 0;
  answered = false;
  isComplete = false;
  answerHistory: AnswerResult[] = [];

  get categories(): string[] {
    return Array.from(new Set(this.questions.map((question) => question.category)));
  }

  get activeQuestions(): QuizQuestion[] {
    if (!this.selectedCategory) {
      return this.questions;
    }

    return this.questions.filter((question) => question.category === this.selectedCategory);
  }

  get currentQuestion(): QuizQuestion {
    return this.activeQuestions[this.currentQuestionIndex];
  }

  get progressPercent(): number {
    return ((this.currentQuestionIndex + (this.answered ? 1 : 0)) / this.activeQuestions.length) * 100;
  }

  get scorePercent(): number {
    return Math.round((this.score / this.activeQuestions.length) * 100);
  }

  get correctCountLabel(): string {
    return `${this.score}/${this.activeQuestions.length}`;
  }

  get canStartQuiz(): boolean {
    return this.playerName.trim().length > 0 && this.selectedCategory.length > 0;
  }

  startQuiz(): void {
    if (!this.canStartQuiz) {
      return;
    }

    this.quizStarted = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.answered = false;
    this.isComplete = false;
    this.answerHistory = [];
  }

  selectAnswer(answerIndex: number): void {
    if (this.answered) {
      return;
    }

    const question = this.currentQuestion;
    const isCorrect = answerIndex === question.correctAnswerIndex;

    this.selectedAnswerIndex = answerIndex;
    this.answered = true;
    this.score += isCorrect ? 1 : 0;
    this.streak = isCorrect ? this.streak + 1 : 0;
    this.bestStreak = Math.max(this.bestStreak, this.streak);
    this.answerHistory.push({
      question: question.prompt,
      selectedAnswer: question.options[answerIndex],
      correctAnswer: question.options[question.correctAnswerIndex],
      isCorrect,
    });
  }

  nextQuestion(): void {
    if (!this.answered) {
      return;
    }

    if (this.currentQuestionIndex === this.activeQuestions.length - 1) {
      this.isComplete = true;
      return;
    }

    this.currentQuestionIndex += 1;
    this.selectedAnswerIndex = null;
    this.answered = false;
  }

  restartQuiz(): void {
    this.quizStarted = false;
    this.playerName = '';
    this.selectedCategory = '';
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.answered = false;
    this.isComplete = false;
    this.answerHistory = [];
  }

  retakeQuiz(): void {
    this.quizStarted = false;
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.answered = false;
    this.isComplete = false;
    this.answerHistory = [];
  }
}
