import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MockDataService} from './_service/mock-data.service';
import {HttpClientModule} from '@angular/common/http';
import {ValdemortModule} from 'ngx-valdemort';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ValdemortModule
  ],
  providers: [MockDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
