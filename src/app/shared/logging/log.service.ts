
import { Injectable } from '@angular/core';

import { LogEntry } from '../logging/log-entry';
import { LogLevel } from '../logging/log-level';
import { LogPublisher } from '../logging/log-publisher';
import { LogPublisherService } from '../logging/log-publisher.service';


/**
 *
 *  Supports logging of different scenario's
 * @export
 * class LogService
 */
@Injectable({
  providedIn: 'root'
})
export class LogService {

  level: LogLevel = LogLevel.Info + LogLevel.Warn + LogLevel.Fatal + LogLevel.Error;
  logWithDate = true;
  publishers: LogPublisher[];
  logSettings;
  isStageOrProd = false;

  constructor(private readonly publisherService: LogPublisherService) {

    // Move this settings array to a central settings file or handle
    this.logSettings = [{
      'publisher': 'Console',
      'logLevel': ['Error', 'Fatal', 'Info', 'Warn', 'Debug']
    }];
    this.publishers = this.publisherService.buildPublishers(this.logSettings);
    //this.isStageOrProd = true;
  }

  /**
   * Creates log entry of type and level "debug"
   *
   * @param string msg - Log message
   * @param any[] params - 
   * @example logger.debug('myVar's value is: ', this.myVar);
   */
  debug(msg: string, ...optionalParams): void {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  /**
  * Creates log entry of type and level "info"
  *
  * @param string msg - Log message
  * @param any[] params - The optional parameter array means you can pass any parameters you want to be logged
  * @example logger.info('method XY finished');
  */
  info(msg: string, ...optionalParams): void {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  /**
  * Creates log entry of type and level "warn"
  *
  * @param string msg - Log message
  * @param any[] params - The optional parameter array means you can pass any parameters you want to be logged
  * @example logger.warn('we catched an error, try operation again.', error);
  */
  warn(msg: string, ...optionalParams): void {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  /**
  * Creates log entry of type and level "error"
  *
  * @param string msg - Log message
  * @param any[] params - The optional parameter array means you can pass any parameters you want to be logged
  * @example logger.warn('API request failed finally. See request:', request);
  */
  error(msg: string, ...optionalParams): void {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  /**
  * Creates log entry of type and level "error"
  *
  * @param string msg - Log message
  * @param any[] params - The optional parameter array means you can pass any parameters you want to be logged
  * @example logger.warn('API request failed finally. See request:', request);
  */
  fatal(msg: string, ...optionalParams): void {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  /**
   * Creates log entry of indifferent type and level "all"
   *
   * @param string msg - Log message
   * @param any[] params - The optional parameter array means you can pass any parameters you want to be logged
   * @example logger.log('started application', timestamp);
   */
  log(msg: string, ...optionalParams): void {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }


  /**
   * @param string msg -Log message
   * @param LogLevel This method decides on what kind of logging has to be enabled (e.g. info, warn, debug)
   * @param any[] params - The optional parameter array means you can pass any parameters you want to be logged
   */
 writeToLog(msg: string, logLevel: LogLevel, params): void {
   //if (!this.isStageOrProd) {
    const entry: LogEntry = new LogEntry();
    entry.message = msg;
    entry.level = logLevel;
    entry.extraInfo = params;
    entry.logWithDate = this.logWithDate;
    this.publishers.forEach(logger => {
      if (logger.shouldLog(logLevel)) {
        logger.log(entry).subscribe();
      }
    });
  //}
}
}
