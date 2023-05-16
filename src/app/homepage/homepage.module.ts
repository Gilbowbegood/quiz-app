import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { QuizComponent } from './quiz/quiz.component';



@NgModule({
  declarations: [
    HomepageComponent,
    QuizComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomepageModule { }
