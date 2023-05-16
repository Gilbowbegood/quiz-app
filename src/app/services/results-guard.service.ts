import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResultsGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    if(!sessionStorage.getItem('questions')) {
      this.router.navigate(['/'])
      return false;
    }
    return true;
  }
}
