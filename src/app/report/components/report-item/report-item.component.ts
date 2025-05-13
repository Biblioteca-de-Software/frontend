import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from '@angular/material/card';
import {ReportEntity} from '../../model/report.entity';


@Component({
  selector: 'app-report-item',
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardHeader,
    MatCard
  ],
  templateUrl: './report-item.component.html',
  styleUrl: './report-item.component.css'
})
export class ReportItemComponent {

  @Input() report!: ReportEntity;

}
