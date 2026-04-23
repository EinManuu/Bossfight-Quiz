import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateQuestions } from './create-questions/create-questions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateQuestions],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
