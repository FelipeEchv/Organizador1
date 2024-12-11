import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.duckduckgo.com';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    const url = `${this.baseUrl}/?q=${encodeURIComponent(query)}&format=json`;
    return this.http.get(url);
  }
}
