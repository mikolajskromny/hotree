import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CategoriesService} from './_service/categories.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule
    ],
    providers: [CategoriesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
