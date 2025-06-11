import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../../../notification/services/notification.service';
import {Notification} from '../../../notification/models/notification.entity';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  imports: [
    CommonModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatButton,
    RouterLink,
    LanguageSwitcherComponent,
    TranslatePipe,
    TranslateModule,
    MatMenuModule
  ],
  templateUrl: './toolbar.component.html',
  standalone: true,
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  @Output() menuToggled = new EventEmitter<void>();

  notifications: Notification[] = [];

  constructor(
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }

  toggleMenu() {
    this.menuToggled.emit();
  }

  showPopup(notification: Notification) {
    alert(notification.description);
  }
}
