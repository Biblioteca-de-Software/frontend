import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {ReportEntity} from '../../model/report-entity';
import {reportService} from '../../services/report.service';

interface Report {
  id: number;
  title: string;
  details: string;
}

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent implements OnInit {
  reports: Report[] = [];
  nextId = 1;

  newReport: Partial<Report> = {
    id: 0,
    title: '',
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
    if (this.newReport.title  && this.newReport.details) {
      const report: Report = {
        id: this.nextId++,
        title: this.newReport.title,
        details: this.newReport.details
      };

      this.reportService.addReports(report).subscribe(() => {this.newReport = { id: 0, title: '',  details: ''};
       });
    }
  }
}
