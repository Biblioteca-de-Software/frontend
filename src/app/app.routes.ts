import {Routes} from "@angular/router";
import {RestoreWorkerComponent} from './public/pages/login/restore-worker/restore-worker.component';
import {RestoreOwnerComponent} from './public/pages/login/restore-owner/restore-owner.component';
import {ValidationComponent} from './public/pages/login/validation/validation.component';
import {DashboardComponent} from './public/pages/dashboard/dashboard.component';
import {HomeComponent} from './public/pages/home/home.component';

import { AuthGuard } from './guards/auth.guard';
const PageNotFoundComponent = () => import('./public/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
const InventoryComponent = () => import('./inventory/components/inventory-table/inventory-table.component').then(m => m.InventoryTableComponent);
const LoginOwnerComponent = () => import('./public/pages/login/login-owner/login-owner.component').then(m => m.LoginOwnerComponent);
const LoginWorkerComponent = () => import('./public/pages/login/login-worker/login-worker.component').then(m => m.LoginWorkerComponent);
const RegisterOwnerComponent = () => import('./public/pages/login/register-user/register-owner/register-owner.component').then(m => m.RegisterOwnerComponent);
const RegisterWorkerComponent = () => import('./public/pages/login/register-user/register-worker/register-worker.component').then(m => m.RegisterWorkerComponent);
const RecoverPasswordOwnerComponent = () => import('./public/pages/login/recover-password-owner/recover-password-owner.component').then(m => m.RecoverPasswordOwnerComponent);
const RecoverPasswordWorkerComponent = () => import('./public/pages/login/recover-password-worker/recover-password-worker.component').then(m => m.RecoverPasswordWorkerComponent);
const NotificationsComponent = () => import('./notification/components/notification-list/notification-list.component').then(m => m.NotificationListComponent);

import {SummaryCardsComponent} from './reports/components/summary-cards/summary-cards.component';
import {SubscriptionPageComponent} from './subscription/pages/subscription-page/subscription-page.component';
import {SubscribeSuccessComponent} from './subscription/pages/subscribe-success/subscribe-success.component';
import {OrdersPageComponent} from './neworders/pages/order-page/order-page.component';

export const routes: Routes = [

  // RUTAS PÚBLICAS
  { path: 'pages/login-owner', loadComponent: LoginOwnerComponent },
  { path: 'pages/login-worker', loadComponent: LoginWorkerComponent },
  { path: 'pages/register-worker', loadComponent: RegisterWorkerComponent },
  { path: 'pages/register-owner', loadComponent: RegisterOwnerComponent },
  { path: 'pages/recover-password-worker', loadComponent: RecoverPasswordWorkerComponent },
  { path: 'pages/recover-password-owner', loadComponent: RecoverPasswordOwnerComponent },
  { path: 'pages/restore-owner', component: RestoreOwnerComponent },
  { path: 'pages/restore-worker', component: RestoreWorkerComponent },
  { path: 'pages/validation', component: ValidationComponent },

  // RUTAS PRIVADAS (protegidas con AuthGuard)

  { path: 'pages/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'pages/home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'pages/notifications', loadComponent: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'pages/orders', component: OrdersPageComponent, canActivate: [AuthGuard] },
  { path: 'pages/products', loadComponent: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'pages/report', component: SummaryCardsComponent, canActivate: [AuthGuard] },
  { path: 'pages/subscription', component: SubscriptionPageComponent, canActivate: [AuthGuard] },
  { path: 'pages/subscription/success', component: SubscribeSuccessComponent, canActivate: [AuthGuard] },

  // REDIRECCIÓN INICIAL
  { path: '', redirectTo: 'pages/login-owner', pathMatch: 'full' },

  // 404
  { path: '**', loadComponent: PageNotFoundComponent }
];
