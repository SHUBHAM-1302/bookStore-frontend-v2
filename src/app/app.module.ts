import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { BaseHttpService } from './shared/base/base-http.service';
import { HttpErrorHandler } from './shared/base/http-error-handler.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';

import { AuthInterceptor, EventTypes, PublicEventsService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs/operators';
import { KBNotificationService } from './shared/notification/kb-notification.service';
import { NotificationComponent } from './shared/notification/notification.component';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NgxPrinterModule } from 'ngx-printer';
import { ToastModule } from 'primeng/toast';
import { BookListComponent } from './bookList/bookList.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { _bookListService } from './bookList/_bookList.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, NotificationComponent,
        BookListComponent,
        BookDetailsComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        InputNumberModule,
        RadioButtonModule,
        ToastModule,
        KeyFilterModule,
        TableModule,
        CheckboxModule,
        ButtonModule,
        NgxPrinterModule.forRoot({ printOpenWindow: true })

    ],
    providers: [_bookListService, provideHttpClient(), HttpErrorHandler, KBNotificationService, MessageService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],

})
export class AppModule {
    constructor(private readonly eventService: PublicEventsService) {
        this.eventService
            .registerForEvents()
            .pipe(
                filter((notification) => notification.type === EventTypes.ConfigLoaded)
            )
            .subscribe((config) => {

            });
    }

}
