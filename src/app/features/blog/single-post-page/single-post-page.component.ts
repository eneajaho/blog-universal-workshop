import { Component } from '@angular/core';
import { BlogService } from '../../../blog.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { SeoService } from '../../../seo.service';

@Component({
  selector: 'app-single-post-page',
  templateUrl: './single-post-page.component.html',
  styleUrls: [ './single-post-page.component.scss' ]
})
export class SinglePostPageComponent {

  post$ = this.route.paramMap.pipe(
    switchMap(params => this.blog.getById(params.get('id')!)),
    tap(post => this.seo.setTags({ title: post.title, description: post.content.slice(0, 30) }))
  );

  constructor(
    private route: ActivatedRoute,
    private blog: BlogService,
    private seo: SeoService
  ) {}

}
