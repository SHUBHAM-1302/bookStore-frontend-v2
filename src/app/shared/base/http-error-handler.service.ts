import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Http exception handler
 */
export type HandleError = <T>(
    operation?: string,
    result?: T
) => (error: HttpErrorResponse) => Observable<T>;

/**
 * Handles HttpClient errors
 */
@Injectable()
export class HttpErrorHandler {
    static createHandleError(arg0: string): any {
        throw new Error('Method not implemented.');
    }
    constructor() { }

    /* Create curried handleError function that already knows the service name */
    createHandleError =
        (serviceName = '') =>
            <T>(resourceErrorMessage = 'operationErrorMessage'): any =>
                this.handleError(serviceName, resourceErrorMessage);

    /**
     * Returns a function that handles Http operation failures/ errors.
     * This error handler lets the app conts if no error occurred.
     */
    handleError<T>(
        serviceName = '',
        resourceErrorMessage = 'resourceErrorMessage'
    ) {
        return (errorResponse: HttpErrorResponse): Observable<T> => {
            const errorMessage = errorResponse.error.message
                ? errorResponse.error
                : '';
            const errorCode: string = errorResponse.error.errorCode;
            return throwError(errorMessage);
        };
    }
}
