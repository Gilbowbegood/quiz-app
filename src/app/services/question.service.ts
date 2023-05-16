import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer, Question } from '../interface/question.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'https://opentdb.com/api.php';

  constructor(
    private httpClient: HttpClient
  ) { }

  getQuestion(categoryId: number, difficulty: string): Observable<Question>{
    const option = {
      params: {
        amount: 5,
        category: categoryId,
        difficulty: difficulty,
        type: 'multiple'
      }
    }

    return this.httpClient.get<Question>(this.apiUrl, option);
  }

  shuffle(array: Array<Answer>) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
