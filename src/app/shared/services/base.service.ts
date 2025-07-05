import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export abstract class BaseService<T> {
  protected resourceEndpoint!: string;

  constructor(protected http: HttpClient) {}

  // ✅ Headers con token actualizado dinámicamente
  protected getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // 🔄 Obtener URL completa
  protected resourcePath(id?: number): string {
    return id ? `${this.resourceEndpoint}/${id}` : this.resourceEndpoint;
  }

  // ✅ GET ALL
  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.getAuthHeaders());
  }

  // ✅ GET BY ID
  public getById(id: number): Observable<T> {
    return this.http.get<T>(this.resourcePath(id), this.getAuthHeaders());
  }

  // ✅ CREATE
  public create(resource: T): Observable<T> {
    return this.http.post<T>(this.resourcePath(), resource, this.getAuthHeaders());
  }

  // ✅ UPDATE
  public update(id: number, resource: T): Observable<T> {
    return this.http.put<T>(this.resourcePath(id), resource, this.getAuthHeaders());
  }

  // ✅ DELETE
  public delete(id: number): Observable<T> {
    return this.http.delete<T>(this.resourcePath(id), this.getAuthHeaders());
  }

  // ❌ Manejo de errores (puedes personalizar)
  protected handleError(error: any): Observable<never> {
    console.error('BaseService Error:', error);
    return throwError(() => error);
  }
}
