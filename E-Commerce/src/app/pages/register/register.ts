import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  register() {
    console.log('FORM DATA =>', this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe({
     next: (res: any) => {
  console.log('REGISTER SUCCESS =>', res);
  this.router.navigate(['/account-created']);
},

      error: (err) => {
        console.log('FULL ERROR =>', err);
        console.log('err.error =>', err.error);
        console.log('inner error =>', err.error?.error);
        console.log('message =>', err.error?.error?.message);
        console.log('stack =>', err.error?.error?.stack);
      },
    });
  }
}
