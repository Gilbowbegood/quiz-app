import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://opentdb.com/api_category.php';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategoriesList(): Observable<Category> {
    return this.httpClient.get<Category>(this.apiUrl);
  }
}
