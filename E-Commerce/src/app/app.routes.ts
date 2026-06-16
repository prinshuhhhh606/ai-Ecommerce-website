import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { Pagination } from './shared/pagination/pagination';
import { Products } from './pages/products/products';

import { CheckoutComponent } from './pages/checkout/checkout';
import { PaymentComponent } from './pages/payment/payment';
import { UserComponent } from './pages/users/users';
import { OrdersComponent } from './pages/orders/orders';
import { ProductCardComponent } from './Components/product-card/product-card';
import { ProductListComponent } from './Components/product-list/product-list';
import { AIProductSearchComponent } from './features/ai-shopping-assistant/ai-shopping-assistant';
import { OrderSuccessComponent } from './pages/order-success/order-success';

export const routes: Routes = [
  {
    path: '',
    component: Pagination,
  },
  {
    path: 'product',
    component: Pagination,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'my-orders',
    component: OrdersComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'cart',
    component: Products,
  },
  {
    path: 'product/:id',
    component: ProductListComponent,
  },
  {
    path: 'ai-search',
    component: AIProductSearchComponent,
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
  }
];