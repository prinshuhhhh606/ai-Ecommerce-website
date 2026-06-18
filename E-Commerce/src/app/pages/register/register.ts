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
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        console.log('REGISTER SUCCESS =>', res);

        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.log('REGISTER ERROR =>', err);
       
          console.log('REGISTER ERROR =>', err);
          console.log('BACKEND ERROR =>', err.error);
        },
    });
  }
}
