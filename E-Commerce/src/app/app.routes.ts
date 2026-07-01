import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { PaginationComponent } from './shared/pagination/pagination';
import { Products } from './pages/products/products';

import { CheckoutComponent } from './pages/checkout/checkout';
import { PaymentComponent } from './pages/payment/payment';
import { UserComponent } from './pages/users/users';
import { OrdersComponent } from './pages/orders/orders';
import { ProductCardComponent } from './Components/product-card/product-card';
import { ProductListComponent } from './Components/product-list/product-list';

import { OrderSuccessComponent } from './pages/order-success/order-success';
import { RegisterComponent } from './pages/register/register';
import { Wishlist } from './pages/wishlist/wishlist';
import { HeroBannerComponent } from './pages/banner/banner';
import { HomeComponent } from './pages/home/home';
import { AdminDashboardComponent } from './pages/admin/admin';
import { DashboardComponent } from './pages/dashboard/dashboard';

import { WalletComponent } from './pages/wallet/wallet';
import { ReferralComponent } from './pages/referral/referral';
import { AiSearchComponent } from './features/aifeature/aifeature';
import { CouponComponent } from './pages/coupan/coupan';
import { AccountCreatedComponent } from './Components/acount-successfull/acount-successfull';


import { NotificationComponent } from  './pages/notification/notification'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product',
    component: PaginationComponent,
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
    path: 'admin/ai-search',
    component: AiSearchComponent,
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'wishlist',
    component: Wishlist,
  },
  {
    path: 'banner',
    component: HeroBannerComponent,
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'coupan',
    component: CouponComponent
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'referral',
    component: ReferralComponent
  },
  {
    path: 'account-created',
    component: AccountCreatedComponent
  },
  {
    path: 'notifications',
    component: NotificationComponent
  }
 
];