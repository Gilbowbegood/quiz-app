import { Component, OnInit } from '@angular/core';
import { ResultsEntity } from '../interface/question.interface';
import { QUESTION_KEY } from '../shared/constants';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  questions : ResultsEntity[] = [];

  counter: number = 0;

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem(QUESTION_KEY)) {
      this.questions = JSON.parse(sessionStorage.getItem(QUESTION_KEY) as string);
    }

    this.calculateFinalScore();
  }

  private calculateFinalScore(): void {
    this.questions.forEach(x => {
      x.answers.forEach(y => {
        if(y.isCorrect && y.isClicked) {
          this.counter++;
        }
      })
    })
  }

}
