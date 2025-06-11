import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {ReportEntity} from '../../model/report-entity';
import {reportService} from '../../services/report.service';
import {TranslatePipe} from '@ngx-translate/core';

interface Report {
  id: number;
  title: string;
  date: Date;
  details: string;
}

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  imports: [
    FormsModule,
    NgForOf,
    TranslatePipe
  ],
  standalone: true,
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent implements OnInit {
  reports: Report[] = [];
  nextId = 1;

  newReport: Partial<Report> = {
    id: 0,
    title: '',
    date: new Date(),
    details: ''
  };

  constructor(private reportService: reportService) { }

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getReports().subscribe((data: ReportEntity[]) => {
      this.reports = data;
    });
  }
  addReport(): void {
    if (this.newReport.title && this.newReport.date && this.newReport.details) {
      const report: Report = {
        id: this.nextId++,
        title: this.newReport.title,
        date: this.newReport.date,
        details: this.newReport.details
      };

      this.reportService.addReports(report).subscribe(() => {this.newReport = { id: 0, title: '', date: new Date(), details: ''};
       });
    }
  }
}
