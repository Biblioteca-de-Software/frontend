import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {ReportEntity} from '../../model/report-entity';
import {reportService} from '../../services/report.service';

interface Report {
  title: string;
  description: string;
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

  newReport: Partial<Report> = {
    description: '',
    title: ''
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
    if (this.newReport.title && this.newReport.description) {
      const reportPayload = {
        title: this.newReport.title,
        description: this.newReport.description
      };

      this.reportService.addReports(reportPayload).subscribe((savedReport: any) => {
        // Assuming backend returns the saved report with ID
        const newEntity = new ReportEntity(savedReport.id, savedReport.title, savedReport.description);
        this.reports.push(newEntity);
        this.newReport = { title: '', description: '' };
      });
    }
  }
}
