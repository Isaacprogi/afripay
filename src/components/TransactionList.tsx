'use client';

import { Transaction } from '@/types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-xs">
        <div className="max-w-md mx-auto">
          <div className="text-4xl mb-3">💳</div>
          <p className="text-lg font-normal text-gray-600 mb-2">No transactions found</p>
          <p className="text-sm text-gray-500">Add your first transaction to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 tracking-wide">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 tracking-wide">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 tracking-wide">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 tracking-wide">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {transactions.map((transaction, index) => (
              <tr 
                key={transaction.id} 
                className="hover:bg-gray-50 transition-colors duration-150 group cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                      <span className="text-blue-600 text-sm">
                        {transaction.type === 'credit' ? '↑' : '↓'}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-normal text-gray-900">
                        {transaction.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.type === 'credit' ? '+' : ''}${transaction.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${
                      transaction.type === 'credit'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600 font-normal">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}