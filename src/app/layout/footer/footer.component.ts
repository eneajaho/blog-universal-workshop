import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="text-center p-4 h6 bg-dark text-light">
      All Rights Reserved @ Enea's Blog
    </div>
  `,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { }
