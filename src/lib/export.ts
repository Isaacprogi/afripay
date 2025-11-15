import { Transaction } from '@/types/transaction';

export const exportToCSV = (transactions: Transaction[], filename: string = 'transactions.csv') => {
  const headers = ['ID', 'Description', 'Amount', 'Type', 'Date'];
  const csvContent = [
    headers.join(','),
    ...transactions.map(transaction => [
      transaction.id,
      `"${transaction.description.replace(/"/g, '""')}"`,
      transaction.amount,
      transaction.type,
      transaction.date
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToXLSX = async (transactions: Transaction[], filename: string = 'transactions.xlsx') => {
  // For simplicity, we'll use CSV for now
  // In a real implementation, you might use a library like xlsx
  exportToCSV(transactions, filename.replace('.xlsx', '.csv'));
};