import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../app.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.appService.username = '';
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

}
