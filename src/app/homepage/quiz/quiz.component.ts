import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IResultsEntity } from 'src/app/interface/question.interface';
import { QUESTION_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnChanges {

  @Input() questions : IResultsEntity[] = []

  givenAnswers: Map<string, string> = new Map();
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.questions.currentValue != changes.questions.previousValue) {
      this.givenAnswers.clear();
    }
  }

  saveAnswer(question: string, answer: string, questionIndex: number, answerIndex: number): void{
    this.givenAnswers.set(question, answer);
    this.questions[questionIndex].answers.forEach((x, index) => {
      x.isClicked = index === answerIndex;
    })
  }

  goToResults(): void {
    sessionStorage.setItem(QUESTION_KEY, JSON.stringify(this.questions));
    this.router.navigate(['/results']);
  }

}
