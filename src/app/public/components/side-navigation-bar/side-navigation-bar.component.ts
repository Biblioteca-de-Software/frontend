import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { SideNavigationItem } from '../../models/side-navigation-item';
import { Router } from '@angular/router';

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

    TranslateModule,
  ]
})
export class SideNavigationBarComponent {
  isLoggedIn = false;

  sidenavItems: SideNavigationItem[] = [
    { label: 'SIDENAV.HOME', icon: 'home', route: 'pages/home' },
    { label: 'SIDENAV.DASHBOARD', icon: 'dashboard', route: 'pages/dashboard' },
    { label: 'SIDENAV.ORDERS', icon: 'restaurant_menu', route: 'pages/orders' },
    { label: 'SIDENAV.INVENTORY', icon: 'inventory_2', route: 'pages/products' },
    { label: 'SIDENAV.REPORT', icon: 'note_add', route: 'pages/report' },
    { label: 'SIDENAV.NOTIFICATIONS', icon: 'notifications', route: 'pages/notifications' },
    { label: 'SIDENAV.SUBSCRIPTION', icon: 'payment', route: 'pages/subscription' },
    { label: 'SIDENAV.LOGOUT', icon: 'logout', action: 'logout' }
  ];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.isLoggedIn = !!localStorage.getItem('token'); // 👈 Verifica sesión activa
  }

  handleItemClick(item: SideNavigationItem) {
    if (item.action === 'logout') {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }
  ngOnInit() {
    this.checkLoginStatus();
    window.addEventListener('storage', () => {
      this.checkLoginStatus(); // se actualiza si otro tab cambia el token
    });
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

}
