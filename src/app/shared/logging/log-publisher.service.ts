/*
 * <copyright>
 *
 * Copyright (c) 2022 ETAS GmbH. All rights reserved.
 *
 * </copyright>
 */
import { Injectable } from '@angular/core';

import { LogPublisher } from './log-publisher';
import { LogConsole } from './log-console';



/**
 * @export
 * class LogPublisherService - This class is responsible for building publishers array
 */
@Injectable({
  providedIn: 'root'
})

export class LogPublisherService {
  publishers: LogPublisher[] = [];


  /**
   * Iterates over the logSettings array and creates the log publishers.
   *
   * @param logSettings Array of log settings objects
   * @returns Array of all created log publishers
   */
  buildPublishers(logSettings: []): LogPublisher[] {
    logSettings.forEach((lp: {}) => {
      if (lp.hasOwnProperty('publisher')) {

        // create publisher
        const publisher = this.buildPublisher(lp['publisher']);
        if (!publisher) {
          return;
        }

        // setup individual log types / levels for publisher
        if (lp.hasOwnProperty('logLevel')) {
          publisher.setLogLevel(lp['logLevel']);
        }

        this.publishers.push(publisher);
      }
    });

   return this.publishers;
  }

  /**
   * Creates a single log publisher by type
   *
   * @param publisherType Type of publisher like "Console" or "LocalStorage"
   * @returns Passes back the created log publisher or null if there is no pbulisher to the given type
   */
  buildPublisher(publisherType: string): LogPublisher | null {

    publisherType = publisherType.toLowerCase();

    let publisher = null;
    switch (publisherType) {

      case 'console':
        publisher = new LogConsole();
        break;

      //case 'localstorage':
      //  publisher = new LogLocalStorage();
      //  break;

      // Log API is not implemented yet on backend side
      // case 'webapi':
      //   publisher = new LogWebApi();
      //   break;
    }

    return publisher;
  }
}
