import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleError } from './http-error-handler.service';
// import { LOGGEDINUSER } from '../kb-common.constants';
import { environment } from 'src/environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { KBSessionService } from '../services/kb-session.service';

/**
 *
 * Base class: Provides methods for CRUD operations on all external data displayed and used in the app.
 * @export
 * class BaseHttpService
 */
@Injectable({
    providedIn: 'root',
})
export class BaseHttpService {
    protected baseUrl = environment.apiURL + '/v1/md';

    protected headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    protected httpOptions = {
        headers: this.headers,
    };

    constructor(
        protected http: HttpClient,
        protected kbSessionService: KBSessionService,

    ) { }

    protected getActiveTenant(): string {
        let tenantId = '';
        if (this.kbSessionService.getActiveTenant() != null) {
            tenantId = this.kbSessionService.getActiveTenant();
        }
        return tenantId;
    }

    protected getActiveLoggedInId(): string {
        let userId = '';
        if (this.kbSessionService.getActiveLoggedInId() != null) {
            userId = this.kbSessionService.getActiveLoggedInId();
        }
        return userId;
    }

    /**
     * Fetch all resources of a type
     *
     */
    readAll(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        urlParams?: HttpParams
    ): Observable<any[]> {
        // ...Using read; assuming url contains appropriate urls
        return this.http
            .get<any[]>(url, { params: urlParams, headers: this.headers })
            .pipe(
                tap((data) => this.postProcessReadAll(data)),
                catchError(handleError(serviceMethodErrorMessage, []))
            );
    }

    /**
* Fetch all resources of a type
*
*/
    readWithParams(url: string, serviceMethodErrorMessage: string, handleError: HandleError, urlParams?: HttpParams): Observable<any> {
        // ...Using read; assuming url contains appropriate urls
        return this.http.get<any>(url, { params: urlParams })
            .pipe(
                tap(data => this.postProcessReadAll(data)),
                catchError(handleError(serviceMethodErrorMessage, []))
            );
    }
    /**
     * Fetch a single resource of a type
     */
    read(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        id?: string,
        responseHeader?: any
    ): Observable<any> {
        const readUrl = id ? `${url}${id}/` : `${url}`;
        return this.http
            .get<any>(readUrl, responseHeader)
            .pipe(catchError(handleError(serviceMethodErrorMessage, {})));
    }

    /**
     * Add a new resource of a type
     *
     */
    create(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        body: any
    ): Observable<any> {
        // ...using Post request
        return this.http
            .post<any>(url, body, this.httpOptions)
            .pipe(catchError(handleError(serviceMethodErrorMessage, body)));
    }

    /**
     * post method with parameters
     * @param url
     * @param serviceMethodErrorMessage
     * @param handleError
     * @param body
     * @param queryParams
     * @returns
     */
    createWithParam(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        body: any,
        queryParams?: any
    ): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        let params = new HttpParams();
        if (queryParams) {
            for (const key in queryParams) {
                if (queryParams.hasOwnProperty(key)) {
                    params = params.append(key, queryParams[key]);
                }
            }
        }

        // Make the POST request with query parameters
        return this.http
            .post<any>(url, body, {
                headers: httpOptions.headers,
                params: queryParams,
            })
            .pipe(catchError(handleError(serviceMethodErrorMessage)));
    }

    put(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        urlParams?: any
    ): Observable<any> {
        // ...using Put request
        return this.http
            .put<any>(url, this.httpOptions, { params: urlParams })
            .pipe(catchError(handleError(serviceMethodErrorMessage)));
    }
    /**
     * Fetch a single resource of a type. this method is to be used when the expected response is a text instead of JSON
     *
     */
    readWithTextResponse(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        id: string
    ): Observable<any> {
        const responseHeader: any = { responseType: 'text' };
        // create a special response header and pass it to the generic read method
        return this.read(
            url,
            serviceMethodErrorMessage,
            handleError,
            id,
            responseHeader
        );
    }

    /**
     * Update an existing resource of a type.
     *
     */
    update(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        body: any
    ): Observable<any> {
        // updating the last modified date
        if (body.hasOwnProperty('modifiedOn')) {
        }

        // ...using Put request
        return this.http
            .put<any>(url, body, this.httpOptions)
            .pipe(catchError(handleError(serviceMethodErrorMessage, body)));
    }

    /**
     * Patch Request
     *
     */
    patchWithBodyAndParam(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        patchDetails: any,
        params: any, // Include your additional parameters here
        id?: string
    ): Observable<any> {
        patchDetails.push({
            op: 'replace',
            path: '/upsertInfo/modifiedBy',
            value: this.getActiveLoggedInId(),
        });

        if (id) {
            url = `${url}${id}/`;
        }

        // Add query parameters to the URL
        const queryParams = new URLSearchParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                queryParams.set(key, params[key]);
            }
        }
        if (queryParams.toString()) {
            url += `?${queryParams.toString()}`;
        }

        // ...using PATCH request
        const patchHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json-patch+json',
            Accept: 'application/json',
        });
        const patchHttpOptions = {
            headers: patchHeaders,
        };

        return this.http.patch<any>(url, patchDetails, patchHttpOptions).pipe(
            tap((data) => this.prepareAfterUpdate(data)),
            catchError(handleError(serviceMethodErrorMessage, patchDetails))
        );
    }

    /**
  * Patch Request with only params
  *
  */
    patchWithParam(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        params: any, // Include your additional parameters here
        id?: string
    ): Observable<any> {

        if (id) {
            url = `${url}${id}/`;
        }
        // Add query parameters to the URL
        const queryParams = new URLSearchParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                queryParams.set(key, params[key]);
            }
        }
        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        // ...using PATCH request
        const patchHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json-patch+json',
            Accept: 'application/json',
        });
        const patchHttpOptions = {
            headers: patchHeaders,
        };

        return this.http.patch<any>(url, patchHttpOptions).pipe(
            tap((data) => this.prepareAfterUpdate(data)),
            catchError(handleError(serviceMethodErrorMessage))
        );
    }
    /**
     * Patch Request
     *
     */
    patch(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        patchDetails?: any,
        id?: string
    ): Observable<any> {
        if (patchDetails.length > 0) {
            patchDetails.push({
                op: 'replace',
                path: '/upsertInfo/modifiedBy',
                value: this.getActiveLoggedInId(),
            });
        }

        if (id) {
            url = `${url}${id}/`;
        }
        // ...using Put request
        const patchHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json-patch+json',
            Accept: 'application/json',
        });
        const patchHttpOptions = {
            headers: patchHeaders,
        };
        return this.http.patch<any>(url, patchDetails, patchHttpOptions).pipe(
            tap((data) => this.prepareAfterUpdate(data)),
            catchError(handleError(serviceMethodErrorMessage, patchDetails))
        );
    }

    /**
     * Patch Request
     *
     */
    patchWithoutUpsert(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        patchDetails?: any,
        id?: string
    ): Observable<any> {
        if (id) {
            url = `${url}${id}/`;
        }
        // ...using Put request
        const patchHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json-patch+json',
            Accept: 'application/json',
        });
        const patchHttpOptions = {
            headers: patchHeaders,
        };
        return this.http.patch<any>(url, patchDetails, patchHttpOptions).pipe(
            tap((data) => this.prepareAfterUpdate(data)),
            catchError(handleError(serviceMethodErrorMessage, patchDetails))
        );
    }

    patchWithApplicationJson(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        patchDetails: any,
        id?: string
    ): Observable<any> {

        if (id) {
            url = `${url}${id}/`;
        }
        // ...using Put request
        const patchHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json-patch+json',
            Accept: 'application/json',
        });
        const patchHttpOptions = {
            headers: patchHeaders,
        };
        return this.http.patch<any>(url, patchDetails, patchHttpOptions).pipe(
            tap((data) => this.prepareAfterUpdate(data)),
            catchError(handleError(serviceMethodErrorMessage, patchDetails))
        );
    }

    /**
     * Patch Request
     *
     */
    patchWithDiffrentObject(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        patchDetails: any,
        id?: string
    ): Observable<any> {
        patchDetails.SPPatchDocument.push({
            from: 'string',
            op: 'replace',
            path: '/upsertInfo/modifiedBy',
            value: this.getActiveLoggedInId(),
        });
        if (id) {
            url = `${url}${id}/`;
        }
        // ...using Put request
        const patchHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json-patch+json',
            Accept: 'application/json',
        });
        const patchHttpOptions = {
            headers: patchHeaders,
        };
        return this.http.patch<any>(url, patchDetails, patchHttpOptions).pipe(
            tap((data) => this.prepareAfterUpdate(data)),
            catchError(handleError(serviceMethodErrorMessage, patchDetails))
        );
    }
    /**
     *  Delete a resource identified by its unique id.
     *
     */
    delete(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        id: string
    ) {
        // ...using delete request
        let urlWithId = url
        if (id) {
            urlWithId = `${url}${id}/`; // DELETE api/projects/42
        }
        return this.http
            .delete<any>(urlWithId, this.httpOptions)
            .pipe(catchError(handleError(serviceMethodErrorMessage)));
    }
    /**
     * Fetch all resources of a type
     *
     */
    deleteWithParam(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        urlParams?: HttpParams
    ) {
        // ...Using read; assuming url contains appropriate urls
        return this.http
            .delete<any>(url, { params: urlParams, headers: this.headers })
            .pipe(
                tap((data) => this.postProcessReadAll(data)),
                catchError(handleError(serviceMethodErrorMessage, []))
            );
    }
    /**
     * Post processing after the REST Get operations
     *
     */
    protected postProcessRead(item: any): any {
        return item;
    }

    /**
     * Post processing after the REST Get ALL operations like sorting, filtering etc
     */
    protected postProcessReadAll(items: any): any {
        return items;
    }

    /**
     * Preprocessing the before POST operation
     *
     */
    protected preProcessUpdate(item: any): any {
        return item;
    }

    /**
     * Postprocessing the after POST operation
     *
     */
    protected prepareAfterUpdate(item: any): any {
        return item;
    }

    /**
   * this function to patch request body with query params .
 * @param url
 * @param serviceMethodErrorMessage
 * @param handleError
 * @param queryParams
 * @param patchDetails
 * @returns
 */
    patchWithBodyAndQueryParams(
        url: string,
        serviceMethodErrorMessage: string,
        handleError: HandleError,
        params: any,
        patchDetails: any[]
    ): Observable<any> {
        // Add query parameters to the URL
        const queryParams = new URLSearchParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                queryParams.set(key, params[key]);
            }
        }
        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        // ...using Put request
        const patchHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json-patch+json',
            Accept: 'application/json',
        });
        const patchHttpOptions = {
            headers: patchHeaders,
        };

        // Send the PATCH request with both query parameters and request body
        return this.http.patch(url, patchDetails, patchHttpOptions).pipe(
            tap((data) => this.prepareAfterUpdate(data)),
            catchError(handleError(serviceMethodErrorMessage, patchDetails))
        );
    }
}
