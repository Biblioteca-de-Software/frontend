import { Component } from '@angular/core';
import { SummaryCardsComponent} from './reports/components/summary-cards/summary-cards.component';

@Component({
  selector: 'app-root',
  imports: [
    SummaryCardsComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KeepItFresh';

}
