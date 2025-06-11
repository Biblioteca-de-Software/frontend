import {Component, HostListener, OnInit} from '@angular/core';
import { Notification } from '../../models/notification.entity';
import { NotificationService } from '../../services/notification.service';
import {NgForOf} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-notification-list',
  imports: [
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './notification-list.component.html',
  standalone: true,
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];


  newNotificationAdded: Notification = {
    id: 0,
    title: '',
    description: '',
    type: '',
    date: new Date()
  };

  showPopup(item:Notification){
    alert(item.description);
  }

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe((data: Notification[]) => {
      this.notifications = data.filter(item => item.type === 'Inventory');
    });
  }

  //Add Notification

  //Remove Notification
  protected readonly environment = environment;
}
