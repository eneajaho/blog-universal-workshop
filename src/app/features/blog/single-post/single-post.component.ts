import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Blogpost } from '../../../blog.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePostComponent {

  @Input() post!: Blogpost;

}
