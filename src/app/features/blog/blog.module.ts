import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { TruncatePipe } from './truncate.pipe';
import { SinglePostPageComponent } from './single-post-page/single-post-page.component';


const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  },
  {
    path: 'details/:id',
    component: SinglePostPageComponent
  }
];

@NgModule({
  declarations: [
    BlogComponent,
    SinglePostComponent,
    TruncatePipe,
    SinglePostPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogModule {
}
