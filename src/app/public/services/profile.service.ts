import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileUrl = 'http://localhost:8080/api/v1/profiles';

  constructor(private http: HttpClient) {}

  getProfileById(profileId: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/${profileId}`);
  }
  getAllProfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.profileUrl);
  }


}
