import { NotificationData } from './../shared/notification-data.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotificationService } from './../shared/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(5px)',
        }),
        animate('150ms 125ms ease-out'),
      ]),
      transition(':leave', [
        animate(
          125,
          style({
            opacity: 0,
            transform: 'scale(0.85)',
          })
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  notifications!: NotificationData[] | null;
  timeout: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications.subscribe(
      (notification: NotificationData) => {
        this.notifications = Array(notification);

        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          this.notifications = null;
        }, notification.duration);
      }
    );
  }
}
