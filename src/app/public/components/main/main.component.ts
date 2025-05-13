import {Component, inject, OnInit} from '@angular/core';
import {ReportEntity} from '../../../report/model/report.entity';
import {ReportApiService} from '../../../report/services/report-api.service';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {ReportListComponent} from '../../../report/components/report-list/report-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: 'main.component.css',
  imports: [MatIconModule,  MatCardModule, ReportListComponent],

})

export class MainComponent implements OnInit {
  reports: Array<ReportEntity> = [];
  private citiesApi = inject(ReportApiService);

  ngOnInit() {
    this.citiesApi.getItems().subscribe(reports => {
      console.log('reports: ', reports);
      this.reports = reports;
      this.reports.forEach(network => {
      });
    });
  }
}
