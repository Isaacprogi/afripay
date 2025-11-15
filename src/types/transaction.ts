export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
}

export type FilterType = 'all' | 'credit' | 'debit';