import { Routes } from '@angular/router';

import { SoloQuiz } from './solo-quiz/solo-quiz';

export const routes: Routes = [
  { path: '', redirectTo: 'solo-quiz', pathMatch: 'full' },
  { path: 'solo-quiz', component: SoloQuiz },
  { path: '**', redirectTo: 'solo-quiz' },
];
