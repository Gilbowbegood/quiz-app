import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { QUESTION_KEY } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ResultsGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    if(!sessionStorage.getItem(QUESTION_KEY)) {
      this.router.navigate(['/'])
      return false;
    }
    return true;
  }
}
