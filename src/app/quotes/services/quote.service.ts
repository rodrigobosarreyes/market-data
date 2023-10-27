import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Quote } from '../models/quote';
import { QuoteValue } from '../models/quote-value';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private static readonly QUOTE_FIELDS = ['LVAL_NORM','CLOSE_ADJ_NORM','NC2_PR_NORM','NC2_NORM','VOL','TUR','PY_CLOSE','YTD_PR_NORM']

  constructor(private readonly http: HttpClient) { }

  public getQuotes(quoteKeys: string[]): Observable<Quote[]> {
    const url = `${AuthService.API_URL}/quotes/${quoteKeys.join(',')}?fields=${QuoteService.QUOTE_FIELDS.join(',')}`
    return this.http.get(url)
      .pipe(map(r => this.mapObj(r)));
  }

  private mapObj(obj: any): Quote[] {
    const { quotes } = obj;
    const result: Quote[] = [];

    for (const quote of quotes) {
      result.push({
        quoteKey: quote.listingKey,
        last: this.getValue(quote, 'LVAL_NORM'),
        close: this.getValue(quote, 'CLOSE_ADJ_NORM'),
        dayChangePercent: this.getValue(quote, 'NC2_PR_NORM'),
        dayChange: this.getValue(quote, 'NC2_NORM'),
        volume: this.getValue(quote, 'VOL'),
        turnover: this.getValue(quote, 'TUR'),
        previousYearClose: this.getValue(quote, 'PY_CLOSE'),
        ytdPercent: this.getValue(quote, 'YTD_PR_NORM')
      });
    }

    return result;
  }

  private getValue(obj: any, key: string): QuoteValue {
    return {
      value: obj.fields[key].v,
      date: new Date(obj.fields[key].d)
    };
  }
}
