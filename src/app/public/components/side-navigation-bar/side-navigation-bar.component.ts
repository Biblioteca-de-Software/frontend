import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { SideNavigationItem } from '../../models/side-navigation-item';

@Component({
  selector: 'app-side-navigation-bar',
  standalone: true,
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    TranslateModule
  ]
})
export class SideNavigationBarComponent {

  sidenavItems: SideNavigationItem[] = [
    { label: 'SIDENAV.HOME', icon: 'home', route: 'pages/home' },
    { label: 'SIDENAV.DASHBOARD', icon: 'dashboard', route: 'pages/dashboard'},
    { label: 'SIDENAV.ORDERS', icon: 'restaurant_menu', route: 'pages/orders' },
    { label: 'SIDENAV.INVENTORY', icon: 'inventory_2', route: 'pages/products' },
    { label: 'SIDENAV.PROFILE', icon: 'person', route: 'pages/login-owner' },
    { label: 'SIDENAV.REPORT', icon: 'note_add', route: 'pages/report' },
    { label: 'SIDENAV.NOTIFICATIONS', icon: 'notifications', route: 'pages/notifications' },
    { label: 'SIDENAV.SUBSCRIPTION', icon: 'payment', route: 'pages/subscription' }

  ];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
