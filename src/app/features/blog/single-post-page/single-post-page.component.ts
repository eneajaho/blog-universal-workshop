import { Component } from '@angular/core';
import { BlogService } from '../../../blog.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-single-post-page',
  templateUrl: './single-post-page.component.html',
  styleUrls: ['./single-post-page.component.scss']
})
export class SinglePostPageComponent {

  post$ = this.route.paramMap.pipe(
    switchMap(params => this.blog.getById(params.get('id')!))
  );

  constructor(private route: ActivatedRoute, private blog: BlogService) { }

}
