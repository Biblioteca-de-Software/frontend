import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    CommonModule, // 👈 AÑADIR ESTO PARA QUE FUNCIONE *ngIf
    MatCard,
  ]
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private http: HttpClient) {
  }
  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.profile.imageUrl = reader.result as string;
        // Aquí podrías enviar al backend si quieres:
        // this.uploadAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});

    this.http.get<any>('https://keepitfresh-platform-yrav.onrender.com/api/v1/profiles', {headers}).subscribe({
      next: (data) => {
        console.log('📦 Perfil recibido (data):', data);
        const profile = data[0];

        // Dividir fullName en firstName y lastName (si es posible)
        const [firstName, ...rest] = profile.fullName.split(' ');
        const lastName = rest.join(' ');

        this.profile = {
          ...profile,
          firstName,
          lastName
        };
      },
      error: (err) => {
        console.error('Error al obtener el perfil', err);
      }
    });
  }
}
