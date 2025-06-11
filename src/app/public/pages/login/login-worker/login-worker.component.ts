import { Component } from '@angular/core';
import {RegisterWorkerService} from "../../../services/register-worker.service";
import {Router, RouterLink} from '@angular/router';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {RegisterOwnerService} from '../../../services/register-owner.service';
import {TranslatePipe} from '@ngx-translate/core';
@Component({
  selector: 'app-login-worker',
  templateUrl: './login-worker.component.html',
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    RouterLink,
    MatLabel,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatAnchor,
    TranslatePipe
  ],
  standalone: true,
  styleUrls: ['./login-worker.component.css']
})
export class LoginWorkerComponent {
  user = { email: '', password: '' };

  constructor(
    private router: Router,
    private registerWorkerService: RegisterWorkerService
  ) {}

  onSubmit() {
    this.registerWorkerService.login(this.user.email, this.user.password)
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
