import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ReportEntity } from '../../model/report-entity';
import { reportService } from '../../services/report.service';

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
  reports: ReportEntity[] = [];

  newReport: Partial<ReportEntity> = {
    title: '',
    description: ''
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
      const report = {
        title: this.newReport.title,
        description: this.newReport.description
      };

      this.reportService.addReports(report).subscribe((savedReport: ReportEntity) => {
        this.reports.push(savedReport); // optional, if backend returns the created report with ID
        this.newReport = { title: '', description: '' };
      });
    }
  }
}
