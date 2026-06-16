import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class UserComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    address: 'Bhopal, MP',
  };
}
