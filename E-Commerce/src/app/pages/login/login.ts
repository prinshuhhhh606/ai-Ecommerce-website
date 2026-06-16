import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  logControl = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  Login() {
    console.log(this.logControl.value);
    this.router.navigate(['/']);
  }
}
