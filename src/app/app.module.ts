import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppComponent } from './app.component';
import { ChartTableComponent } from './chart-form/chart-table/chart-table.component';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { CustomInputComponent } from './chart-form/custom-input/custom-input.component';
import { ChartComponent } from './chart-form/chart/chart.component';
import { HttpRelativeApiUrlInterceptor } from './http/http-interceptor/http-relative-api-url.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpRelativeApiUrlInterceptor,
  multi: true,
};

@NgModule({
  declarations: [
    AppComponent,
    ChartFormComponent,
    ChartTableComponent,
    ChartComponent,
    CustomInputComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    FlexLayoutModule,
    NgxChartsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
