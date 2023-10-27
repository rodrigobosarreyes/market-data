import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { QuoteService } from './quotes/services/quote.service';
import { mergeMap } from 'rxjs';
import { Quote } from './quotes/models/quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  quotes!: Quote[];

  constructor(private readonly authService: AuthService, private readonly quoteService: QuoteService) {}

  ngOnInit(): void {
    this.authService.login()
      .pipe(mergeMap(() => this.quoteService.getQuotes(['2970161-1058-814'])))
      .subscribe( quotes => this.quotes = quotes );
  }
}
