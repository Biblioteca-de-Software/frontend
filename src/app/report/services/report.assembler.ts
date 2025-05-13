import {ReportResponse, ReportResource} from './report.response';
import {ReportEntity} from '../model/report.entity';

export class ReportAssembler {

  static toEntitiesFromResponse(response: ReportResponse): ReportEntity[] {
    return response.items.map(item => this.toEntityFromResource(item));
  }

  static toEntityFromResource(resource: ReportResource): ReportEntity {
    return {
      id: resource.id,
      title: resource.title,
      status: resource.status,
      details: resource.details,
      type: resource.type,
      date: resource.date,
    };
  }
}
