'use client';

import { Transaction } from '@/types/transaction';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { useState } from 'react';

interface ExportButtonProps {
  transactions: Transaction[];
  currentFilter: string;
}

export default function ExportButton({ transactions, currentFilter }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format: 'csv' | 'xlsx') => {
    const filename = `transactions-${currentFilter}-${new Date().toISOString().split('T')[0]}.${format}`;
    
    if (format === 'csv') {
      exportToCSV(transactions, filename);
    } else {
      exportToXLSX(transactions, filename);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="
          bg-white text-gray-700 px-4 py-2.5 rounded-lg
          border border-gray-300 shadow-xs
          hover:bg-gray-50 hover:shadow-sm
          active:bg-gray-100 active:shadow-xs
          transition-all duration-200
          flex items-center gap-2
          text-sm font-normal
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        "
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="
            absolute right-0 mt-2 w-56
            bg-white rounded-xl
            shadow-lg border border-gray-200
            py-2 z-20
            animate-in fade-in slide-in-from-top-2 duration-200
          ">
            <div className="px-3 py-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Export Format
              </p>
            </div>
            
            <button
              onClick={() => handleExport('csv')}
              className="
                w-full text-left px-4 py-3
                text-sm text-gray-700 font-normal
                hover:bg-gray-50
                transition-colors duration-150
                flex items-center gap-3
                group
              "
            >
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span>CSV File</span>
                <span className="text-xs text-gray-500 mt-0.5">Comma-separated values</span>
              </div>
            </button>
            
            <button
              onClick={() => handleExport('xlsx')}
              className="
                w-full text-left px-4 py-3
                text-sm text-gray-700 font-normal
                hover:bg-gray-50
                transition-colors duration-150
                flex items-center gap-3
                group
              "
            >
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span>Excel Workbook</span>
                <span className="text-xs text-gray-500 mt-0.5">Microsoft Excel format</span>
              </div>
            </button>
            
            <div className="border-t border-gray-100 mt-2 pt-2">
              <div className="px-4 py-2">
                <p className="text-xs text-gray-500">
                  {transactions.length} transactions • {currentFilter} filter
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}