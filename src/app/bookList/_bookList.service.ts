import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/base/base-http.service';
import { HandleError, HttpErrorHandler } from '../shared/base/http-error-handler.service';
import { KBSessionService } from '../shared/services/kb-session.service';
import { Observable } from 'rxjs';
import { JRNLPatchDocument } from 'src/gen/jRNLPatchDocument';

@Injectable({
  providedIn: 'root'
})
export class _bookListService {


  private readonly handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler,
  ) {

    this.handleError = httpErrorHandler.createHandleError('sp-seller.Service');
  }

  private apiUrl = `http://localhost:3070/v1/md/book/`;

  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getBookById(id): Observable<any> {
    const url = `http://localhost:3070/v1/md/book/${encodeURIComponent(id)}/`
    return this.http.get<any>(url);
  }

  patchBook(id: number, spPatchDocument: JRNLPatchDocument[]) {
    const url = `http://localhost:3070/v1/md/book/${encodeURIComponent(id)}/`
    const patchHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      Accept: 'application/json',
    });
    const patchHttpOptions = {
      headers: patchHeaders,
    };
    return this.http.patch<any>(url, spPatchDocument, patchHttpOptions)
  }

  updateBook(id: number, book) {
    const url = `http://localhost:3070/v1/md/book/${encodeURIComponent(id)}/`
    const patchHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      Accept: 'application/json',
    });
    const patchHttpOptions = {
      headers: patchHeaders,
    };
    return this.http.put<any>(url, book, patchHttpOptions)
  }

}
