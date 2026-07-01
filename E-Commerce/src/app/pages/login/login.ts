import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';
import { CartService } from '../../core/services/cart.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
  ) {}

  logControl = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  Login() {
    this.authService.login(this.logControl.value).subscribe({
      next: (res: any) => {
        console.log('LOGIN RESPONSE =>', res);

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('userId', res.user._id);

        // Login के बाद server से cart fetch करो
        this.cartService.getCartFromServer().subscribe({
          next: (cartRes: any) => {
            console.log('CART RESPONSE =>', cartRes);

            this.cartService.syncCartFromResponse(cartRes.items);

            this.router.navigate(['/']);
          },
          error: (err) => {
            console.log('CART ERROR =>', err);

            // अगर cart fetch न हो तब भी login हो चुका है
            this.router.navigate(['/']);
          },
        });
      },

      error: (err) => {
        console.log('LOGIN ERROR =>', err);
      },
    });
  }
  register() {
    this.router.navigate(['/register']);
  }
}
