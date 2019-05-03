import { PeriodFilter } from './PeriodFilter';

export interface TradeHistoryFilter {
  tradeTypeId?: string;
  brokerId?: string;
  currencyId?: string;
  securityId?: string;

  period?: PeriodFilter;
}
