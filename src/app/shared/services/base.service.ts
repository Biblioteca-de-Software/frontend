import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export abstract class BaseService<T> {
  // 🔒 Ahora es abstracta: obliga a definirla en subclases
  protected abstract resourceEndpoint: string;

  constructor(protected http: HttpClient) {}

  // ✅ Usado cuando no se requiere token
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // ✅ Usado cuando se requiere token
  protected getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // 🔄 Construye la URL (asume que el host ya viene incluido en resourceEndpoint)
  protected resourcePath(id?: number): string {
    return id ? `${this.resourceEndpoint}/${id}` : this.resourceEndpoint;
  }

  // 📦 CRUD genéricos con token
  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.getAuthHeaders());
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(this.resourcePath(id), this.getAuthHeaders());
  }

  public create(resource: T): Observable<T> {
    return this.http.post<T>(this.resourcePath(), resource, this.getAuthHeaders());
  }

  public update(id: number, resource: T): Observable<T> {
    return this.http.put<T>(this.resourcePath(id), resource, this.getAuthHeaders());
  }

  public delete(id: number): Observable<T> {
    return this.http.delete<T>(this.resourcePath(id), this.getAuthHeaders());
  }

  // 🚨 Manejo básico de errores
  protected handleError(error: any): Observable<never> {
    console.error('BaseService Error:', error);
    return throwError(() => error);
  }
}
