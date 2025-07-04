import { Component } from '@angular/core';
import {RegisterOwnerService} from "../../../../services/register-owner.service";

import {Router, RouterLink} from "@angular/router";
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {TranslatePipe} from '@ngx-translate/core';
@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html',
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    RouterLink,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    TranslatePipe,
  ],
  standalone: true,
  styleUrls: ['./register-owner.component.css']
})
export class RegisterOwnerComponent {

  user = {
    username: '',
    email: '',
    password: '',
    lastName: '',
    firstName: '',
    birthDate: '',
    phoneNumber: ''
  };


  profile = {imageUrl: 'https://imgur.com/YP2XnZT.png', ownerId: 0};

  constructor(private userService: RegisterOwnerService, private router: Router) {
  }

  onSubmit() {
    this.user.username = this.user.email;
    console.log('Datos a registrar:', this.user);

    this.userService.addUser(this.user).subscribe((data: any) => {
      console.log('Usuario creado:', data);
      this.user = {
        username: '',
        email: '',
        password: '',
        lastName: '',
        firstName: '',
        birthDate: '',
        phoneNumber: ''
      };
      this.userService.setCurrentUserId(data.id);

      const ownerId = data.id;
      if (ownerId !== null) {
        this.profile.ownerId = ownerId;
        this.userService.addimageprofile(this.profile).subscribe((data: any) => {
          console.log('Imagen de Perfil creada:', data.id);
        });
      } else {
        console.error('Error: ownerId es nulo');
      }
    });
  }
}
