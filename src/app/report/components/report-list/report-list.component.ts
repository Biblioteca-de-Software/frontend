import {Component, Input} from '@angular/core';
import {ReportItemComponent} from '../report-item/report-item.component';
import {ReportEntity} from '../../model/report.entity';

@Component({
  selector: 'app-report-list',
  imports: [
    ReportItemComponent
  ],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {

  @Input() reports: Array<ReportEntity>=[];

}
