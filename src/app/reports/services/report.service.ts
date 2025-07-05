import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';

import { ReportEntity } from '../model/report-entity';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class reportService extends BaseService<ReportEntity> {

  constructor(http: HttpClient) {
    super(http); // ✅ importante pasar el HttpClient al padre
    this.resourceEndpoint = environment.reportEndpointPath;
  }

  getReports(): Observable<ReportEntity[]> {
    return this.http.get<Array<any>>(this.resourcePath(), this.getAuthHeaders()).pipe(
      retry(2),
      map((rReports: any[]) =>
        rReports.map(r => new ReportEntity(r.id, r.title, r.description))
      )
    );
  }

  addReports(payload: {
    title: string;
    description: string;
  }): Observable<any> {
    return this.http.post(
      `${environment.serverBaseUrl}${this.resourceEndpoint}`,
      payload,
      this.getAuthHeaders()
    );
  }
}
