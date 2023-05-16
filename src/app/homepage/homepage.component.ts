import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { TriviaCategoriesEntity } from '../interface/category.interface';
import { QuestionService } from '../services/question.service';
import { map, tap } from 'rxjs/operators';
import { Answer, ResultsEntity } from '../interface/question.interface';

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

  constructor(
    private _categoryService: CategoryService,
    private _questionService: QuestionService
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
      map(response => response.results),
      tap(results => {
        results.forEach(item => {
          let answers: Answer[] = [];
          item.incorrect_answers.forEach(x => {
            answers.push({isCorrect: false, value: x, isClicked: false})
          })
          answers.push({isCorrect: true, value: item.correct_answer, isClicked: false})
          item.answers = answers;
          this._questionService.shuffle(item.answers);
        })
        this.questions = results;
      }),
    ).subscribe();
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

}
