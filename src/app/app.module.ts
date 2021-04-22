import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./features/landing/landing.module')
          .then(m => m.LandingModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.module')
          .then(m => m.BlogModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./features/contact/contact.module')
          .then(m => m.ContactModule)
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
];


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
