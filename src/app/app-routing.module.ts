import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ResultsComponent } from './results/results.component';
import { ResultsGuardService } from './services/results-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'results',
    component: ResultsComponent,
    canActivate: [ ResultsGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
