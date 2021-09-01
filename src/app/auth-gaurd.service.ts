import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGaurdService implements CanActivate {

  constructor() {

  }

  canActivate(): boolean {
    if (!localStorage.getItem('username')) {
      return false;
    }
    return true;
  }
}
