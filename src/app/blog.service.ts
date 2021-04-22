import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../environments/environment';
import { delay } from 'rxjs/operators';

export interface Blogpost {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {

  constructor(private http: HttpClient) {}

  getBlogPosts(page: number = 0, size: number = 10): Observable<Blogpost[]> {
    const params = new HttpParams()
      .append('_page', page + '')
      .append('_limit', size + '');
    const path = `${ env.apiUrl }/posts`;
    return this.http.get<Blogpost[]>(path, { params }).pipe(
      delay(1000)
    );
  }

  getById(id: string): Observable<Blogpost> {
    const path = `${ env.apiUrl }/posts/${id}`;
    return this.http.get<Blogpost>(path).pipe(
      delay(1000)
    );
  }

}
