'use client';

import { Transaction } from '@/types/transaction';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  const inflow = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const outflow = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = inflow - outflow;

  const cards = [
    {
      title: 'Total Inflow',
      amount: inflow,
      type: 'credit' as const,
      trend: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'Total Outflow',
      amount: outflow,
      type: 'debit' as const,
      trend: 'negative',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    },
    {
      title: 'Net Balance',
      amount: balance,
      type: 'balance' as const,
      trend: balance >= 0 ? 'positive' : 'negative',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const getCardStyles = (type: 'credit' | 'debit' | 'balance', trend: 'positive' | 'negative') => {
    const baseStyles = "p-6 rounded-xl border transition-all duration-200 hover:shadow-sm";
    
    switch (type) {
      case 'credit':
        return `${baseStyles} bg-green-50 border-green-200 hover:border-green-300`;
      case 'debit':
        return `${baseStyles} bg-red-50 border-red-200 hover:border-red-300`;
      case 'balance':
        return trend === 'positive' 
          ? `${baseStyles} bg-blue-50 border-blue-200 hover:border-blue-300`
          : `${baseStyles} bg-orange-50 border-orange-200 hover:border-orange-300`;
      default:
        return `${baseStyles} bg-gray-50 border-gray-200`;
    }
  };

  const getAmountColor = (type: 'credit' | 'debit' | 'balance', trend: 'positive' | 'negative') => {
    switch (type) {
      case 'credit':
        return "text-green-700";
      case 'debit':
        return "text-red-700";
      case 'balance':
        return trend === 'positive' ? "text-blue-700" : "text-orange-700";
      default:
        return "text-gray-700";
    }
  };

  const getIconStyles = (type: 'credit' | 'debit' | 'balance', trend: 'positive' | 'negative') => {
    switch (type) {
      case 'credit':
        return "text-green-600 bg-green-100";
      case 'debit':
        return "text-red-600 bg-red-100";
      case 'balance':
        return trend === 'positive' ? "text-blue-600 bg-blue-100" : "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={getCardStyles(card.type, card.trend)}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600 tracking-wide">
              {card.title}
            </h3>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getIconStyles(card.type, card.trend)}`}>
              {card.icon}
            </div>
          </div>
          
          <p className={`text-2xl font-semibold ${getAmountColor(card.type, card.trend)} mb-1`}>
            {card.type === 'credit' ? '+' : card.type === 'debit' ? '-' : ''}${Math.abs(card.amount).toFixed(2)}
          </p>
          
          <div className="flex items-center text-xs text-gray-500">
            <span>
              {card.type === 'credit' && 'Income received'}
              {card.type === 'debit' && 'Expenses paid'}
              {card.type === 'balance' && (
                <span className={card.trend === 'positive' ? 'text-blue-600' : 'text-orange-600'}>
                  {card.trend === 'positive' ? 'Positive balance' : 'Negative balance'}
                </span>
              )}
            </span>
          </div>
          
          {/* Progress indicator for balance card */}
          {card.type === 'balance' && inflow > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    card.trend === 'positive' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}
                  style={{ 
                    width: `${Math.min(100, Math.max(0, (balance / inflow) * 100))}%` 
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>Net: {((balance / inflow) * 100).toFixed(1)}%</span>
                <span>100%</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}