import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createSearch(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Observable<any> {
    console.log('SearchService create search', query);
    return this.http.post(`${this.apiUrl}/search`, {
      query,
      page,
      pageSize,
    });
  }
}
