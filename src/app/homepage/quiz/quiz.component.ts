import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsEntity } from 'src/app/interface/question.interface';
import { QUESTION_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() questions : ResultsEntity[] = []

  givenAnswers: Map<string, string> = new Map();
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  saveAnswer(question: string, answer: string, questionIndex: number, answerIndex: number): void{
    this.givenAnswers.set(question, answer);
    this.questions[questionIndex].answers.forEach((x, index) => {
      if(index === answerIndex) {
        x.isClicked = true;
      }
      else {
        x.isClicked = false;
      }
    })
  }

  goToResults(): void {
    sessionStorage.setItem(QUESTION_KEY, JSON.stringify(this.questions));
    this.router.navigate(['/results']);
  }

}
