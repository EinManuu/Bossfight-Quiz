import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { Homepage } from './homepage/homepage';
import { SoloQuiz } from './solo-quiz/solo-quiz';
import { StudyZone } from './study-zone/study-zone';
import { Leaderboard } from './leaderboard/leaderboard';
import { BossBattle } from './boss-battle/boss-battle';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'home', component: Homepage },
  { path: 'solo-quiz', component: SoloQuiz },
  { path: 'study-zone', component: StudyZone },
  { path: 'leaderboard', component: Leaderboard },
  { path: 'boss-battle', component: BossBattle },
];
