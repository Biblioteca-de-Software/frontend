import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterOwnerService {
  private apiUrl = 'http://localhost:8080/api/v1/authentication';
  private profileUrl = 'http://localhost:8080/api/v1/profiles';
  private currentUserId: number | null = null;

  constructor(private http: HttpClient) {}

  // Registrar usuario
  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, userData);
  }

  setCurrentUserId(id: number) {
    this.currentUserId = id;
  }

  // Crear perfil
  addimageprofile(profileData: any): Observable<any> {
    return this.http.post<any>(this.profileUrl, profileData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, {
      username: email,  // 👈 el backend espera "username", no "email"
      password: password
    });
  }



}
