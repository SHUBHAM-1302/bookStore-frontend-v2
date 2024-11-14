
import { LogLevel } from './log-level';


/**
 * @export
 * class LogEntry - This method is responsible for constructing the log message structure
 * based on article - https://www.codemag.com/article/1711021/Logging-in-Angular-Applications
 */
export class LogEntry {
  // Public Properties
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: {}[] = [];
  logWithDate = true;


  /**
   * @returns string - returns log message structure
   */
  buildLogString(): string {
    let messageformat = '';
    if (this.logWithDate) {
      messageformat = `${new Date()} - `;
    }
    messageformat += `Type: ${LogLevel[this.level]}`;
    messageformat += ` - Message: ${this.message}`;
    if (this.extraInfo.length) {
      messageformat += ` - Extra Info: ${this.formatParams(this.extraInfo)}`;
    }
    return messageformat;
  }


  /**
   * @param any[] params - The optional parameter array means you can pass any parameters you want to be logged
   * @returns string - returns formatted string for optional paramters
   */
  private formatParams(params): string {
    let modifiedParams: string = params.join(',');
    // Is there at least one object in the array?
    if (params.some(param => typeof param === 'object')) {
      modifiedParams = '';
      // Build comma-delimited string
        params.forEach(item => {
        modifiedParams += `${JSON.stringify(item)},`;
      });
    }
    return modifiedParams;
  }
}

