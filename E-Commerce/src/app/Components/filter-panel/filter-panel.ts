import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  imports: [ FormsModule],
  templateUrl: './filter-panel.html',
  styleUrls: ['./filter-panel.css'],
})
export class FilterPanelComponent {
  selectedCategory: string = '';
  maxPrice: number = 100000;

  @Output() filterChanged = new EventEmitter<any>();

  applyFilter() {
    this.filterChanged.emit({
      category: this.selectedCategory,
      maxPrice: this.maxPrice,
    });
  }
}
