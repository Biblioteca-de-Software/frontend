import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ReportEntity } from '../model/report-entity';
import { environment} from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class reportService {
  private apiUrl = 'http://localhost:3000/api/v1/reports';

  constructor(private http: HttpClient) {}

  getReports(): Observable<ReportEntity[]> {
    return this.http.get<ReportEntity[]>(`${environment.serverBaseUrl}${environment.reportProviderApiBaseUrl}`);
  }

  addReports(report: ReportEntity): Observable<any> {
    return this.http.post<any>(`${environment.serverBaseUrl}${environment.reportProviderApiBaseUrl}`, report);
  }
}
