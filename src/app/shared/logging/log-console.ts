
import { LogPublisher } from './log-publisher';
import { Observable, of } from 'rxjs';
import { LogEntry } from './log-entry';
import { LogLevel } from './log-level';

/**
 * @export
 * class LogConsole - This class is responsible for logging the messages to console
 * @extends {LogPublisher}
 */
export class LogConsole extends LogPublisher {

    /**
     * Method outputs the data in browser's console depending on log type.
     *
     * @param LogEntry Data object to output
     * @return Always returns true
     */
    log(entry: LogEntry): Observable<boolean> {
        switch (entry.level) {

            case LogLevel.Error:
            case LogLevel.Fatal:
                console.error(entry.buildLogString());
                break;

            case LogLevel.Debug:
                // tslint:disable-next-line:no-console
                console.debug(entry.buildLogString());
                break;

            case LogLevel.Warn:
                console.warn(entry.buildLogString());
                break;

            case LogLevel.Info:
                // tslint:disable-next-line:no-console
                console.info(entry.buildLogString());
                break;

            default:
                console.log(entry.buildLogString());
                break;
        }

        return of(true);
    }

    /**
     * Clear log messages in console / clear console.
     */
    clear(): Observable<boolean> {
        console.clear();
        return of(true);
    }

}
