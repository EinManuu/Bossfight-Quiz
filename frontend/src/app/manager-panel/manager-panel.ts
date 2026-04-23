import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateQuestions } from '../create-questions/create-questions';
import { CreateBoss } from '../create-boss/create-boss';

@Component({
  selector: 'app-manager-panel',
  standalone: true,
  imports: [CreateQuestions, CreateBoss],
  templateUrl: './manager-panel.html',
  styleUrl: './manager-panel.css',
})
export class ManagerPanel {

  constructor(private router:Router) {
  }

  protected tab: number = 0;

  goHome() {
    this.router.navigate(['/home']);
  }


}
