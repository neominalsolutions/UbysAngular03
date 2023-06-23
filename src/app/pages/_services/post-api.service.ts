import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  constructor(private http: HttpClient) {}

  create(param: any) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', param, {
      headers: {
        Lang: 'tr-TR',
      },
    });
  }

  getById(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
