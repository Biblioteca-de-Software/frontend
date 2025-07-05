import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterOwnerService {
  private apiUrl = 'http://localhost:8080/api/v1/authentication';
  private profileUrl = 'http://localhost:8080/api/v1/profiles';
  private currentUserId: number | null = null;

  constructor(private http: HttpClient) {}

  // Registrar nuevo usuario (Owner)
  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, userData);
  }

  // Guardar ID actual del usuario registrado (si necesitas reutilizarlo)
  setCurrentUserId(id: number) {
    this.currentUserId = id;
  }

  addimageprofile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post<any>(this.profileUrl, profileData, { headers });
  }



  // Iniciar sesión del usuario
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, {
      username: email,
      password: password
    });
  }

  // Cerrar sesión: eliminar token e ID, redirigir si es necesario
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('onid'); // o 'workerId' si aplica
    this.currentUserId = null;
  }

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
