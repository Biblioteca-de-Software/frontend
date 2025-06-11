import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionPlan } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private translate: TranslateService) {}

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
          ]
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
          ]
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
          ]
        }
      ])
    );
  }
}
