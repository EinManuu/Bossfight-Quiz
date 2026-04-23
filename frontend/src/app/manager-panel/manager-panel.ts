import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import {CreateQuestions} from '../create-questions/create-questions';
import {CreateBoss} from '../create-boss/create-boss';

@Component({
  selector: 'app-manager-panel',
  imports: [NgForOf, NgIf, CreateQuestions, CreateBoss],
  templateUrl: './manager-panel.html',
  styleUrl: './manager-panel.css',
})
export class ManagerPanel {

  protected window:number = 0;


}
