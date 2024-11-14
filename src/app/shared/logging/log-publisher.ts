import { Observable } from 'rxjs';

import { LogEntry } from './log-entry';
import { LogLevel } from './log-level';

/**
 * @export
 * class LogPublisher - Abstract class with default methods for logging
 */
export abstract class LogPublisher {
  location: string;
  logLevel: LogLevel;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;

  /**
   * Sets the log type(s) for messages.
   *
   * @param level Name or names as string or array of strings of the log types that should be displayed.
   * @return Currently set log level (sum of types) that was set.
   */
  setLogLevel(level: string | string[]): LogLevel {
    let logLevel = [];
    if (!(level instanceof Array)) {
      logLevel = [level];
    } else {
      logLevel = level;
    }

    this.logLevel = LogLevel.Off;

    logLevel.forEach((l) => {
      if (LogLevel[l]) {
        this.logLevel += parseInt(LogLevel[l], 10);
      }
    });
    return this.logLevel;
  }

  /**
   * This method decides on what kind of logging has to be enabled (e.g. info, warn, debug)
   *
   * @param level Logging level of message to match against log types that should be displayed.
   * @returns boolean
   */
  shouldLog(level: LogLevel): boolean {
      if ((level & this.logLevel) !== 0) {
        return true;
      } else {
        return false;
      }
  }
}
