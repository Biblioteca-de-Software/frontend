import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { ReportEntity } from '../model/report-entity';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReportService extends BaseService<ReportEntity> {

  protected override resourceEndpoint = `${environment.serverBaseUrl}${environment.reportEndpointPath}`;

  constructor(protected override http: HttpClient) {
    super(http);
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
      this.resourceEndpoint,
      payload,
      this.getAuthHeaders()
    );
  }
}
