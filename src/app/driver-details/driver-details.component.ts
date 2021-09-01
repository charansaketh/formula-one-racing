import {Component, OnInit} from '@angular/core';
import {Driver} from '../domain/driver';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {
  driverModel: Driver;
  driverForm: FormGroup;
  teams = [];
  id: any;
  btnText = 'Add Driver';

  constructor(private fb: FormBuilder,
              private appService: AppService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.driverForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.extractId();
    this.getTeams();
  }

  // Returns teams
  getTeams() {
    this.appService.getTeams()
      .subscribe((response) => {
        this.teams = response;
        if (this.id !== -1) {
          this.getDriverById();
          this.btnText = 'Update Driver';
        }
      });
  }

  // add or update drivers
  onSubmit(form: FormGroup) {
    this.btnText === 'Add Driver' ? this.addDriver(form) : this.updateDriver(form);
  }

  // Add drivers
  addDriver(form: FormGroup) {
    this.driverModel = form.value;
    this.appService.addDriver(this.driverModel)
      .subscribe((response) => {
        this.router.navigate(['/drivers']);
      });
  }

  // Update drivers
  updateDriver(form: FormGroup) {
    this.driverModel = form.value;
    this.appService.updateDriver(this.id, this.driverModel)
      .subscribe((response) => {
        this.router.navigate(['/drivers']);
      });
  }

  extractId() {
    this.activatedRoute.params.subscribe((res) => {
      this.id = +res.id;
    });
  }

  // Returns driver by id
  getDriverById() {
    this.appService.getDriverById(this.id)
      .subscribe((response: Driver) => {
        this.driverForm.setValue({
          firstName: response.firstName,
          lastName: response.lastName,
          jobTitle: response.jobTitle,
          status: response.status,
          team: response.team
        });
      });
  }
}
