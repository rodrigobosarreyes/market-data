import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { PositiveNegativeColorDirective } from './quotes/directives/positive-negative-color.directive';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { QuoteComponent } from './quotes/components/quote/quote.component';

@NgModule({
  declarations: [
    AppComponent,
    ShortNumberPipe,
    PositiveNegativeColorDirective,
    QuoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
