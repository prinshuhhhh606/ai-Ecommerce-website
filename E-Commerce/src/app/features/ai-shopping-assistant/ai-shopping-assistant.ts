import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AIRecommendationService } from '../../core/services/ai-assisstance.services';

@Component({
  selector: 'app-ai-product-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-shopping-assistant.html',
  styleUrls: ['./ai-shopping-assistant.css'],
})
export class AIProductSearchComponent {
  query = '';

  recommendations: any[] = [];

  loading = false;

  constructor(private aiService: AIRecommendationService) {}

  searchProducts() {
    if (!this.query.trim()) {
      this.recommendations = [];
      return;
    }

    this.loading = true;

    this.aiService.getRecommendations(this.query).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        this.recommendations = response.products || [];

        this.loading = false;
      },

      error: (error) => {
        console.error('Search Error:', error);

        this.recommendations = [];
        this.loading = false;
      },
    });
  }
}
