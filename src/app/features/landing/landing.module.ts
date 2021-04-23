import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { RouteData } from '../../models/route-data';


const routes: Routes = [
  {
    path: '', component: LandingComponent,
    data: {
      title: 'Homepage',
      description: 'Bla bla bla'
    } as RouteData
  }
];

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LandingModule { }
