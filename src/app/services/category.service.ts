import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://opentdb.com/api_category.php';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategoriesList(): Observable<ICategory> {
    return this.httpClient.get<ICategory>(this.apiUrl);
  }
}
