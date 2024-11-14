
import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';


/**
 * The class handles the display of the messages as notifications to the user
 *
 * @export
 * class KBNotificationService
 */
@Injectable({
  providedIn: 'root'
})
export class KBNotificationService {

  msgs: Message[] = [];
  private readonly messageDefaults: object;

  constructor(
    private readonly messageService: MessageService) {
    this.messageDefaults = {
      key: 'kb_md',
      severity: 'info',
      life: 3000,
      sticky: false,
      closable: true
    }

  }

  showInfo(messageData): void {
    this.showNotification(messageData)
  }

  showWarn(messageData): void {
    messageData.severity = 'warn';
    this.showNotification(messageData);
  }

  showError(messageData): void {
    messageData.severity = 'error';
    this.showNotification(messageData);
  }

  showSuccess(messageData): void {
    messageData.severity = 'success';
    this.showNotification(messageData);
  }
  showNotification(messageData): void {
    for (const key in this.messageDefaults) {
      if (this.messageDefaults.hasOwnProperty(key)) {
        messageData[key] = messageData[key] ? messageData[key] : this.messageDefaults[key];
      }

    }
    this.messageService.add(messageData);

  }
}
