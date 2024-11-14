import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from './../environments/environment';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = environment.title;
    apiURL = environment.apiURL;


    constructor(private primengConfig: PrimeNGConfig,
    ) {

    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }


}
