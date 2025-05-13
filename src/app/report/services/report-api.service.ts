import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ReportResponse} from './report.response';
import {ReportAssembler} from './report.assembler';
import {ReportEntity} from '../model/report.entity';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportApiService {
  private baseUrl = environment.reportProviderApiBaseUrl;

  constructor(private http:HttpClient) {}
  getItems(): Observable<ReportEntity[]> {
    return this.http.get<ReportResponse>(`${this.baseUrl}`).pipe(
      map(response => ReportAssembler.toEntitiesFromResponse(response))
    );
  }
}
