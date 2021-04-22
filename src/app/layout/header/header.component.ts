import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-3 h5">
      <a class="navbar-brand" routerLink="/">Enea's Blog</a>
      <div class="collapse navbar-collapse" >
        <div class="navbar-nav">
          <a class="nav-link" routerLinkActive="active" routerLink="/landing">Home</a>
          <a class="nav-link" routerLinkActive="active" routerLink="/blog">Blog</a>
          <a class="nav-link" routerLinkActive="active" routerLink="/contact">Contact</a>
        </div>
        <div class="navbar-nav ms-auto">
          <a class="nav-link" routerLinkActive="active" routerLink="/dashboard">Dashboard</a>
        </div>
      </div>
    </nav>
  `,
  styleUrls: [ './header.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
}
