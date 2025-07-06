import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionPlan } from '../../models/subscription.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-plans-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslatePipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit {
  plans: SubscriptionPlan[] = [];
  isLoading = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.isLoading = true;
    this.subscriptionService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Error loading plans', 'Close', { duration: 5000 });
      }
    });
  }

  subscribe(plan: SubscriptionPlan): void {
    const testEmail = prompt('Enter email for testing:', 'test@example.com');
    if (!testEmail) return;

    this.isLoading = true;
    this.subscriptionService.createCheckoutSession(testEmail, plan.id)
      .subscribe({
        next: (response) => {
          if (response.checkoutUrl) {
            window.location.href = response.checkoutUrl;
          } else {
            throw new Error('No checkout URL received');
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open(err.error?.message || 'Subscription error', 'Close', { duration: 5000 });
        }
      });
  }
}
