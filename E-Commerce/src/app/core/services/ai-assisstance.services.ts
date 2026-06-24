import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = 'https://ai-ecommerce-website-2yam.onrender.com/api/ai';

  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.post(`${this.apiUrl}/search`, {
      query,
    });
  }
}
