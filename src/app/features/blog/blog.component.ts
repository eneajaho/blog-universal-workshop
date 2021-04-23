import { Component, OnInit } from '@angular/core';
import { Blogpost, BlogService } from '../../blog.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: [ './blog.component.scss' ]
})
export class BlogComponent implements OnInit {

  page = 0;
  loading = false;

  posts: Blogpost[] = [];

  constructor(private blog: BlogService) {}

  ngOnInit(): void {
    this.loading = true;
    this.blog.getBlogPosts(this.page).pipe(take(1)).subscribe(
      data => {
        this.posts = [ ...data ];
        this.loading = false;
      }
    );
  }

  loadMore(): void {
    this.page++;
    this.loading = true;
    this.blog.getBlogPosts(this.page).pipe(take(1)).subscribe(
      data => {
        this.posts = [ ...this.posts, ...data ];
        this.loading = false;
      }
    );
  }

  trackByFn(index: number, post: Blogpost): number {
    return post.id;
  }

}
