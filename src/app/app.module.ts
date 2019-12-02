import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MockDataService} from './_service/mock-data.service';
import {HttpClientModule} from '@angular/common/http';
import {ValdemortModule} from 'ngx-valdemort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        ValdemortModule,
        ToastrModule.forRoot({
                closeButton: true,
                positionClass: 'toast-top-right',
                progressBar: true,
                preventDuplicates: true,
                resetTimeoutOnDuplicate: true,
                messageClass: 'toastr',
                titleClass: 'toastr',
                extendedTimeOut: 3000,
                timeOut: 3000
            }
        )
    ],
    providers: [MockDataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
