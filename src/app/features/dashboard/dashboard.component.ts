import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}
  // constructor() { }

  ngOnInit(): void {
    // dont solve it like this, instead use InjectionToken to inject fake localStorage class
    // https://github.com/angular/universal/blob/master/docs/gotchas.md#strategy-2-guards
    if (isPlatformBrowser(this.platformId)) {
      const test = localStorage.getItem('test');
      console.log(test);
    }
  }

}
