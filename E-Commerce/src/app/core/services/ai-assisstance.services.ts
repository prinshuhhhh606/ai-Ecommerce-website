import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AIRecommendationService {
  constructor(private http: HttpClient) {}

  getRecommendations(query: string) {
    return this.http.get(
      `https://dummyjson.com/products/search?q=${query}`,
    );
  }
}
