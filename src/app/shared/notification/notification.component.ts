
import { KBNotificationService } from './kb-notification.service'; 
import { Component } from '@angular/core';

/**
 * The notification component is a placeholder in the main component to display the user messages
 *
 * @export
 * class NotificationComponent
 * implements {OnInit}
 * implements {OnDestroy}
 */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: []
})


export class NotificationComponent {
  constructor(private readonly notificationService: KBNotificationService) { }

}
