import { QuoteValue } from "./quote-value";

export interface Quote {
  quoteKey: string;
  last: QuoteValue;
  close: QuoteValue;
  dayChangePercent: QuoteValue;
  dayChange: QuoteValue;
  volume: QuoteValue;
  turnover: QuoteValue;
  previousYearClose: QuoteValue;
  ytdPercent: QuoteValue;
}
