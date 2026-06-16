import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  imports: [ CommonModule],
  styleUrls: ['./product-list.css'],
})
export class ProductListComponent {
  products = [
    {
      id: 1,
      name: 'iPhone 15',
      price: 79999,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 2,
      name: 'Samsung S24',
      price: 69999,
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 3,
      name: 'OnePlus 12',
      price: 59999,
      image: 'https://via.placeholder.com/200',
    },
  ];

  addToCart(product: any) {
    console.log('Added to Cart:', product);
  }
}
