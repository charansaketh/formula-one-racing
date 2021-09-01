import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriversComponent} from './drivers/drivers.component';
import {DriverDetailsComponent} from './driver-details/driver-details.component';
import {LoginComponent} from './login/login.component';
import {AuthGaurdService} from './auth-gaurd.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'drivers',
    component: DriversComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'driver-details/:id',
    component: DriverDetailsComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
