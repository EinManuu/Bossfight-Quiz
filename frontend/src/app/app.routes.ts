import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { Homepage } from './homepage/homepage';
import { SoloQuiz } from './solo-quiz/solo-quiz';
import { StudyZone } from './study-zone/study-zone';
import { Leaderboard } from './leaderboard/leaderboard';
import { BossBattle } from './boss-battle/boss-battle';
import { CreateQuestions } from './create-questions/create-questions';
import { authGuardGuard } from './auth-guard-guard';
import { adminGuardGuard } from './admin-guard-guard';
import {Notfound} from './notfound/notfound';

export const routes: Routes = [
  { path: '', component: LoginPage},
  { path: 'home', component: Homepage, canActivate: [authGuardGuard]},
  { path: 'solo-quiz', component: SoloQuiz, canActivate:[authGuardGuard]},
  { path: 'study-zone', component: StudyZone, canActivate:[authGuardGuard] },
  { path: 'leaderboard', component: Leaderboard, canActivate:[authGuardGuard] },
  { path: 'boss-battle', component: BossBattle, canActivate:[authGuardGuard] },
  { path: 'admin-panel', component: CreateQuestions, canActivate:[authGuardGuard, adminGuardGuard] },
  { path: '**', component: Notfound},
];
