import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionPlan } from '../models/subscription.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private serverBaseUrlSubscription = environment.serverBaseUrlSubscription;

  // Mapeo de IDs de plan frontend a backend
  private planIdMap: { [key: string]: string } = {
    'starter': 'STARTER',
    'pro': 'PRO',
    'pro-yearly': 'PRO_ANNUAL'
  };

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  getPlans(): Observable<SubscriptionPlan[]> {
    return this.translate.get([
      'subscriptions.STARTER_NAME',
      'subscriptions.STARTER_DESCRIPTION',
      'subscriptions.PRO_NAME',
      'subscriptions.PRO_YEARLY_NAME',
      'subscriptions.PRO_DESCRIPTION',
      'subscriptions.FEATURES.LIMITED_PRODUCTS',
      'subscriptions.FEATURES.BASIC_ALERTS',
      'subscriptions.FEATURES.SEARCH',
      'subscriptions.FEATURES.EXPORT',
      'subscriptions.FEATURES.UNLIMITED_PRODUCTS',
      'subscriptions.FEATURES.CUSTOM_ROLES',
      'subscriptions.FEATURES.EMAIL_REPORTS',
      'subscriptions.FEATURES.TRAINING',
      'subscriptions.FEATURES.SUPPORT'
    ]).pipe(
      map(translations => [
        {
          id: 'starter',
          name: translations['subscriptions.STARTER_NAME'],
          description: translations['subscriptions.STARTER_DESCRIPTION'],
          price: 19,
          priceFormatted: 'S/.19/mo',
          features: [
            translations['subscriptions.FEATURES.LIMITED_PRODUCTS'],
            translations['subscriptions.FEATURES.BASIC_ALERTS'],
            translations['subscriptions.FEATURES.SEARCH']
          ],
          backendPlanId: this.planIdMap['starter']
        },
        {
          id: 'pro',
          name: translations['subscriptions.PRO_NAME'],
          description: translations['subscriptions.PRO_DESCRIPTION'],
          price: 49,
          priceFormatted: 'S/.49/mo',
          features: [
            translations['subscriptions.FEATURES.UNLIMITED_PRODUCTS'],
            translations['subscriptions.FEATURES.CUSTOM_ROLES'],
            translations['subscriptions.FEATURES.EMAIL_REPORTS'],
            translations['subscriptions.FEATURES.TRAINING'],
            translations['subscriptions.FEATURES.SUPPORT']
          ],
          backendPlanId: this.planIdMap['pro']
        },
        {
          id: 'pro-yearly',
          name: translations['subscriptions.PRO_YEARLY_NAME'],
          description: translations['subscriptions.PRO_DESCRIPTION'],
          price: 490,
          priceFormatted: 'S/.490/yr',
          features: [
            translations['subscriptions.FEATURES.UNLIMITED_PRODUCTS'],
            translations['subscriptions.FEATURES.CUSTOM_ROLES'],
            translations['subscriptions.FEATURES.EMAIL_REPORTS'],
            translations['subscriptions.FEATURES.TRAINING'],
            translations['subscriptions.FEATURES.SUPPORT']
          ],
          backendPlanId: this.planIdMap['pro-yearly']
        }
      ])
    );
  }

  createCheckoutSession(email: string, planId: string): Observable<{ checkoutUrl: string }> {
    const backendPlanId = this.planIdMap[planId];

    if (!backendPlanId) {
      this.showError('Invalid plan selected');
      return of({ checkoutUrl: '' });
    }

    return this.http.post<{ checkoutUrl: string }>(
      `${this.serverBaseUrlSubscription}/api/subscriptions`,
      {
        userEmail: email,
        plan: backendPlanId
      }
    ).pipe(
      catchError(error => {
        this.showError(error.error?.message || 'Failed to create subscription');
        throw error;
      })
    );
  }

  checkSubscriptionStatus(email: string): Observable<UserSubscription> {
    return this.http.get<UserSubscription>(
      `${this.serverBaseUrlSubscription}/api/subscriptions?email=${encodeURIComponent(email)}`
    ).pipe(
      catchError(error => {
        this.showError('Failed to check subscription status');
        throw error;
      })
    );
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}

// Interface para la respuesta del backend
interface UserSubscription {
  id: number;
  email: string;
  plan: string;
  status: 'pending' | 'active' | 'canceled';
  stripeSubscriptionId: string;
  active: boolean;
  createdAt: string;
  startDate: string;
}
