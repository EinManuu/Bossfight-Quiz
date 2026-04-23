import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { Register } from './register/register';
import { Homepage } from './homepage/homepage';
import { SoloQuiz } from './solo-quiz/solo-quiz';
import { StudyZone } from './study-zone/study-zone';
import { Leaderboard } from './leaderboard/leaderboard';
import { BossBattle } from './boss-battle/boss-battle';
import { CreateQuestions } from './create-questions/create-questions';
import { authGuardGuard } from './auth-guard-guard';
import { adminGuardGuard } from './admin-guard-guard';
import {Notfound} from './notfound/notfound';
import {ManagerPanel} from './manager-panel/manager-panel';

export const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:"full"},
  { path: 'login', component: LoginPage, pathMatch: 'full'},
  { path: 'register', component: Register},
  { path: 'home', component: Homepage, canActivate: [authGuardGuard], pathMatch: 'full'},
  { path: 'solo-quiz', component: SoloQuiz, canActivate:[authGuardGuard], pathMatch: 'full'},
  { path: 'study-zone', component: StudyZone, canActivate:[authGuardGuard], pathMatch: 'full' },
  { path: 'leaderboard', component: Leaderboard, canActivate:[authGuardGuard], pathMatch: 'full' },
  { path: 'boss-battle', component: BossBattle, canActivate:[authGuardGuard], pathMatch: 'full' },
  { path: 'admin-panel', component: ManagerPanel, canActivate:[authGuardGuard, adminGuardGuard], pathMatch: 'full' },
  { path: '**', component: Notfound},
];
