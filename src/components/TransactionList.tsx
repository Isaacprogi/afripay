'use client';

import { Transaction } from '@/types/transaction';
import { useState } from 'react';

interface TransactionListProps {
  transactions: Transaction[];
  onEditTransaction: (id: string, updates: Partial<Transaction>) => void;
  onDeleteTransaction: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
}

export default function TransactionList({ 
  transactions, 
  onEditTransaction, 
  onDeleteTransaction,
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10
}: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDelete = (transactionId: string) => {
    setDeleteTransactionId(transactionId);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingTransaction) {
      onEditTransaction(editingTransaction.id, {
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        date: editingTransaction.date,
      });
      setIsEditModalOpen(false);
      setEditingTransaction(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteTransactionId) {
      onDeleteTransaction(deleteTransactionId);
      setIsDeleteModalOpen(false);
      setDeleteTransactionId(null);
    }
  };

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsEditModalOpen(false);
      setIsDeleteModalOpen(false);
    }
  };

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
    <div className="space-y-6">
      {/* Transactions List with Actions */}
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
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedTransactions.map((transaction, index) => (
                <tr 
                  key={transaction.id} 
                  className="hover:bg-gray-50 transition-colors duration-150 group"
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {/* Enhanced Edit Button */}
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group"
                        title="Edit transaction"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="text-sm font-medium hidden sm:inline-block">Edit</span>
                      </button>
                      
                      {/* Enhanced Delete Button */}
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 group"
                        title="Delete transaction"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-sm font-medium hidden sm:inline-block">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, transactions.length)}
                </span> of{' '}
                <span className="font-medium">{transactions.length}</span> results
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Transaction Modal - Transparent */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md border border-white/20 animate-in fade-in-90 zoom-in-90">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Edit Transaction</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Update your transaction details
                  </p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter transaction description"
                    value={editingTransaction?.description || ''}
                    onChange={(e) => setEditingTransaction(prev => 
                      prev ? { ...prev, description: e.target.value } : null
                    )}
                  />
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount ($)
                  </label>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                    placeholder="0.00"
                    value={editingTransaction?.amount || ''}
                    onChange={(e) => setEditingTransaction(prev => 
                      prev ? { ...prev, amount: parseFloat(e.target.value) } : null
                    )}
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Transaction Type
                  </label>
                  <select
                    id="type"
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                    value={editingTransaction?.type || 'debit'}
                    onChange={(e) => setEditingTransaction(prev => 
                      prev ? { ...prev, type: e.target.value as 'credit' | 'debit' } : null
                    )}
                  >
                    <option value="debit">Debit (Expense)</option>
                    <option value="credit">Credit (Income)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                    value={editingTransaction?.date ? new Date(editingTransaction.date).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditingTransaction(prev => 
                      prev ? { ...prev, date: e.target.value } : null
                    )}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200/50">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white/80 border border-gray-300 rounded-xl hover:bg-gray-50/80 transition-all duration-200 hover:shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Transparent */}
      {isDeleteModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md border border-white/20 animate-in fade-in-90 zoom-in-90">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Delete Transaction</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    This action cannot be undone
                  </p>
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Are you sure?
                </p>
                <p className="text-gray-600">
                  This transaction will be permanently deleted from your records.
                </p>
              </div>
              
              <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200/50">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white/80 border border-gray-300 rounded-xl hover:bg-gray-50/80 transition-all duration-200 hover:shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                >
                  Delete Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}