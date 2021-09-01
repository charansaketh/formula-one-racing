import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {Driver} from '../domain/driver';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  drivers: Driver[] = [];

  constructor(public appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.appService.getDrivers().subscribe((drivers: Driver[]) => (this.drivers = drivers));
  }

  goToAddDriverForm() {
    this.router.navigate(['/driver-details', -1]);
  }

  updateDriver(id: any) {
    this.router.navigate(['/driver-details', id]);
  }

  removeDriver(id: any) {
    this.appService.removeDriver(id)
      .subscribe(() => {
        this.getDrivers();
      });
  }

}
