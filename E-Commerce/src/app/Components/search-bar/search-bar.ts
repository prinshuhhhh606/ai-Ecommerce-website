import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBarComponent {
  searchText: string = '';

  onSearch() {
    console.log('Searching for:', this.searchText);

    // API call ya product filtering yahan kar sakte ho
  }
}
