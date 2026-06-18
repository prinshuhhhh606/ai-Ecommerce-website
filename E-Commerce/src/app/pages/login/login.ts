import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';

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
  ) {}

  logControl = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  Login() {
    this.authService.login(this.logControl.value).subscribe({
      next: (res: any) => {
        console.log('LOGIN SUCCESS =>', res);

        localStorage.setItem('token', res.token);

        localStorage.setItem('user', JSON.stringify(res.user));

        this.router.navigate(['/']);
      },

      error: (err) => {
        console.log('LOGIN ERROR =>', err);
      },
    });
  }

  register(){
    this.router.navigate(['/register'])
  }
}
