import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <div class="fluid-container">
      <app-header></app-header>
      <div class="min-vh-100">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
