import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansListComponent } from '../../components/plans-list/plans-list.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-subscription-page',
  standalone: true,
  imports: [CommonModule, PlansListComponent, TranslatePipe],
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css']
})
export class SubscriptionPageComponent {

}
