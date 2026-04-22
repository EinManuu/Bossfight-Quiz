import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloQuiz } from './solo-quiz';

describe('SoloQuiz', () => {
  let component: SoloQuiz;
  let fixture: ComponentFixture<SoloQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoloQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(SoloQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
