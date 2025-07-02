import { Injectable } from '@angular/core';
import {map, Observable, retry} from 'rxjs';

import { ReportEntity } from '../model/report-entity';
import { environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';

const orderResourceEndpoint = environment.reportEndpointPath;


@Injectable({ providedIn: 'root' })
export class reportService extends BaseService<ReportEntity> {

  constructor() {
    super();
    this.resourceEndpoint = environment.serverBaseUrl + orderResourceEndpoint;
  }


  getReports(): Observable<ReportEntity[]> {
    return this.http.get<Array<any>>(this.resourcePath(), this.httpOptions).pipe(
      retry(2),
      map((rReports: any[]) => rReports.map(r => new ReportEntity(r.id, r.title, r.description)))
    );
  }

  addReports(payload:{
    title: string;
    details: string;
  }): Observable<ReportEntity>
  {
    return this.http.post<ReportEntity>(this.resourcePath(), payload, this.httpOptions)
  }

  //getReports(): Observable<ReportEntity[]> {
  //  return this.http.get<ReportEntity[]>(`${environment.serverBaseUrl}${environment.reportProviderApiBaseUrl}`);
  //}

  //addReports(report: ReportEntity): Observable<any> {
    //return this.http.post<any>(`${environment.serverBaseUrl}${environment.reportProviderApiBaseUrl}`, report);
  //}
}
