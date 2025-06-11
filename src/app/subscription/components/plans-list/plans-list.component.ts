import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionPlan } from '../../models/subscription.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plans-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit {
  plans: SubscriptionPlan[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadPlans();

    // recarga los planes si el usuario cambia el idioma
    this.translate.onLangChange.subscribe(() => {
      this.loadPlans();
    });
  }

  loadPlans(): void {
    this.subscriptionService.getPlans().subscribe((data: SubscriptionPlan[]) => {
      this.plans = data;
    });
  }

  subscribe(plan: SubscriptionPlan): void {
    console.log('Subscribed to plan:', plan);
    this.router.navigate(['/subscription/success']);
  }
}
