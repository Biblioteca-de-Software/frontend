import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { RegisterOwnerService } from '../../../services/register-owner.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.component.html',
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    RouterLink,
    MatLabel,
    MatFormField,
    TranslatePipe,
    MatLabel,
    MatInput,
    FormsModule,

    MatAnchor
  ],
  standalone: true,
  styleUrls: ['./login-owner.component.css']
})
export class LoginOwnerComponent {
  user = { email: '', password: '' };

  constructor(
    private router: Router,
    private registerOwnerService: RegisterOwnerService
  ) {}

  onSubmit() {
    this.registerOwnerService.login(this.user.email, this.user.password)
      .subscribe({
        next: (user) => {
          this.router.navigate(['/owner/main-page-owner', user.id]);
          localStorage.setItem('onid', user.id.toString());
        },
        error: () => {
          alert("Vuelve a ingresar tus datos");
        }
      });
  }
}
