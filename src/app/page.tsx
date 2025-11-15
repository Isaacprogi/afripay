'use client';

import { useState, useEffect } from 'react';
import { Transaction, FilterType } from '@/types/transaction';
import { getStoredTransactions, saveTransactions } from '@/utils/storage';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import TransactionFilters from '@/components/TransactionFilters';
import SummaryCards from '@/components/SummaryCards';
import ExportButton from '@/components/ExportButton';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const storedTransactions = getStoredTransactions();
    setTransactions(storedTransactions);
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setIsFormOpen(false); // Close the form after adding
  };

  const editTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id ? { ...transaction, ...updates } : transaction
      )
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' || transaction.type === filter
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transaction Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage and track your financial transactions</p>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <ExportButton 
              transactions={filteredTransactions} 
              currentFilter={filter} 
            />
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Transaction
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Filters */}
        <TransactionFilters currentFilter={filter} onFilterChange={setFilter} />

        {/* Transaction List with enhanced props */}
        <TransactionList 
          transactions={filteredTransactions}
          onEditTransaction={editTransaction}
          onDeleteTransaction={deleteTransaction}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />

        {/* Add Transaction Form Modal */}
        <TransactionForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAddTransaction={addTransaction}
        />
      </div>
    </div>
  );
}