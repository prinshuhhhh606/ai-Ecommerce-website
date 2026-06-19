import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})
export class HeroBannerComponent {
  
  constructor(private router :Router){}
  onShopNow(): void {
  
    this.router.navigate(['/product']);
  }

 
}