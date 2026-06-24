import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ai-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aifeature.html',
  styleUrls: ['./aifeature.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSearchComponent {
  query: string = '';
  response: string = '';
  loading: boolean = false;

  aiData: any = {}; // ✅ SAFE INITIALIZATION

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // URL se query read
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';

      if (this.query?.trim()) {
        this.askAI(); // auto search
      }
    });
  }

  // 🚀 MAIN AI FUNCTION
  askAI() {
    const searchText = this.query?.trim();

    if (!searchText) {
      this.response = 'Please type something...';
      return;
    }

    console.log('🔍 AI SEARCH:', searchText);

    this.loading = true;
    this.response = '';

    this.http
      .post('http://localhost:5000/api/ai/search', {
        query: searchText,
      })
      .subscribe({
        next: (res: any) => {
          console.log('🔥 AI RESPONSE:', res);

          // ✅ FULL RESPONSE STORE
          this.aiData = res || {};

          // text response
          this.response = res.result || '';

          this.loading = false;
            this.cd.detectChanges();
        },

        error: (err) => {
          console.log('❌ ERROR:', err);

          this.response = 'AI error occurred';
          this.loading = false;
        },
      });
  }

  // button click
  search() {
    this.askAI();
  }
}
