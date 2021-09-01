import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  api = 'http://localhost:8000/api';
  username: string;

  constructor(private http: HttpClient) {
  }

  // Returns all drivers
  getDrivers() {
    return this.http
      .get(`${this.api}/drivers`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  // Adds driver
  addDriver(driverForm) {
    return this.http
      .post(`${this.api}/drivers`, driverForm)
      .pipe(catchError(this.handleError));
  }

  // Returns all teams
  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  // Updates driver by id
  updateDriver(id, driverForm) {
    return this.http
      .put(`${this.api}/drivers/${id}`, driverForm)
      .pipe(catchError(this.handleError));
  }

  // Removes driver
  removeDriver(id) {
    return this.http
      .delete(`${this.api}/drivers/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Returns driver by id
  getDriverById(id) {
    return this.http
      .get(`${this.api}/drivers/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
