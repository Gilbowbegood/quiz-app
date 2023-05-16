import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { TriviaCategoriesEntity } from '../interface/category.interface';
import { QuestionService } from '../services/question.service';
import { tap } from 'rxjs/operators';
import { Answer, ResultsEntity } from '../interface/question.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  categoryList: TriviaCategoriesEntity[] = [];

  questions : ResultsEntity[] = [];

  categorySelected: number = 0;
  difficultySelected: string = '';

  numberOfQuestions: number = 0;

  givenAnswers: Map<string, string> = new Map();

  constructor(
    private _categoryService: CategoryService,
    private _questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    sessionStorage.clear();
  }

  private getCategories(): void {
    this._categoryService.getCategoriesList().subscribe(categories => {
      if(!!categories && categories.trivia_categories.length > 0) {
        categories.trivia_categories.forEach(category => {
          if(category) {
            this.categoryList.push(category);
          }
        })
      }
    });
  }

  createQuiz(): void {
    this._questionService.getQuestion(this.categorySelected, this.difficultySelected).pipe(
      tap(res => {
        this.numberOfQuestions = res.results.length;
        res.results.forEach(item => {
          let answers: Answer[] = [];
          item.incorrect_answers.forEach(x => {
            answers.push({isCorrect: false, value: x, isClicked: false})
          })
          answers.push({isCorrect: true, value: item.correct_answer, isClicked: false})
          item.answers = answers;
          this._questionService.shuffle(item.answers);
        })
        this.questions = res.results;
      }),
    ).subscribe();
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

  onDifficultySelected(difficulty: string) {
    this.difficultySelected = difficulty;
  }

  onCategorySelected(category: string) {
    this.categoryList.find(item => {
      if(item.name === category){
        this.categorySelected = item.id;
      }
    });
  }

  goToResults(): void {
    sessionStorage.setItem('questions', JSON.stringify(this.questions));
    this.router.navigate(['/results']);
  }

}
