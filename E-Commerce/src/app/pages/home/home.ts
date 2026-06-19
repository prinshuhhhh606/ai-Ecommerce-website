import { Component } from '@angular/core';

import { HeroBannerComponent } from '../../pages/banner/banner';
import { PaginationComponent } from '../../shared/pagination/pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroBannerComponent, PaginationComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {}
