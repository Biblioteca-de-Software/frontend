import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscribe-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="success-message">
      <h2> Subscription Successful!</h2>
      <p>Thank you for subscribing to a plan.</p>
    </div>
  `,
  styles: [`
    .success-message {
      text-align: center;
      padding: 4rem 1rem;
      font-size: 1.2rem;
    }
    h2 {
      color: #16a34a;
    }
  `]
})
export class SubscribeSuccessComponent {}
