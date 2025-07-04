import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterWorkerService {
  private apiUrl = 'http://localhost:8080/api/v1/authentication/sign-up';
  private profileUrl = 'http://localhost:8080/api/v1/profiles';
  private currentUserId: number | null = null;

  constructor(private http: HttpClient) {}

  // Enviar solo lo necesario al backend
  addUserWorker(userData: any): Observable<any> {
    const body = {
      username: userData.email,
      password: userData.password,
      roles: [{ name: 'ROLE_WORKER' }]
    };
    return this.http.post<any>(this.apiUrl, body);
  }


  setCurrentUserId(id: number) {
    this.currentUserId = id;
  }

  addImageProfile(profileData: any): Observable<any> {
    return this.http.post<any>(this.profileUrl, profileData);
  }

  login(email: string, password: string): Observable<any> {
    // No se usa aquí, pero lo dejamos por si acaso
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            localStorage.setItem('userId', users[0].id);
            return users[0];
          } else {
            throw new Error('Credenciales inválidas');
          }
        })
      );
  }
}
