# Afripay Transaction Dashboard

A mini transaction dashboard built with Next.js 15, Tailwind CSS, and TypeScript for the Afripay Frontend Engineer Assessment.

## Features

- ✅ View transaction list with description, amount, type, and date
- ✅ Filter transactions by type (All, Credit, Debit)
- ✅ Add new transactions via modal form
- ✅ Display summary statistics (Total Inflow, Outflow, Net Balance)
- ✅ Data persistence using localStorage
- ✅ Export transactions to CSV/Excel format
- ✅ Responsive design for desktop and mobile
- ✅ TypeScript for type safety


## Tech Stack

Framework: Next.js (App Router)

Styling: Tailwind CSS

Language: TypeScript

State Management: React Hooks (useState, useEffect)

Data Persistence: localStorage

Export: CSV and Excel export


## PROJECT STRUCTURE

src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── TransactionForm.tsx    # Modal form for adding transactions
│   ├── TransactionList.tsx    # Display and filter transactions
│   ├── SummaryCards.tsx       # Statistics cards (Inflow, Outflow, Balance)
│   ├── TransactionFilters.tsx      # Type filter controls
│   └── ExportButton.tsx       # CSV export functionality
├── types/
│   └── transaction.ts         # TypeScript interfaces
└── utils/
    ├── storage.ts             # localStorage utilities



## COMPONENT ARCHITECTURE


 ### Core Components
#### Main Dashboard (src/app/page.tsx)

* Root component managing global state

* Coordinates data flow between components

* Handles transaction CRUD operations

#### TransactionForm

Modal-based form for adding new transactions

Form validation and error handling

Date picker and amount formatting

#### TransactionList

* Displays transactions in a responsive table

* Implements filtering logic

* Mobile-optimized card layout

#### SummaryCards

* Calculates and displays financial metrics

* Real-time updates on data changes

* Color-coded for better UX

#### FilterButtons

* Toggle between All/Credit/Debit views

* Active state styling

* Accessible button group

* ExportButton

* Generates CSV files from current filtered data

* Includes timestamp in filename

* Handles special character escaping

### Design Decisions
#### State Management
* Used React's built-in useState and useEffect for simplicity

* Local state for form inputs and filters

* Global transaction state lifted to main component

#### Data Persistence
* localStorage chosen for simplicity and persistence requirements

* Automatic save/load on component mount/unmount

* Error handling for storage failures

* Type Safety Comprehensive TypeScript interfaces

* Strict typing for transaction data

* Type-safe utility functions

#### Responsive Design
* Mobile-first approach with Tailwind CSS

* Flexible grid layouts

* Touch-friendly interactive elements

#### User Experience
* Immediate visual feedback on actions

* Clear error states and validation

* Intuitive filtering and export flows

* Accessible color contrast and keyboard navigation




## Getting Started
#### Prerequisites
* Node.js 18+

* npm or yarn

#### Installation
* Clone the repository

```bash bash
git clone https://github.com/Isaacprogi/afripay.git
cd afripay-dashboard
```

#### Install dependencies

```bash npm install
npm install or
yarn install
```

#### Run the development server

bash
``` bash npm run dev
npm run dev or
yarn dev
```

Open your browser and  to http://localhost:3000

#### Building for Production

```
npm run build
npm start
```

#### Usage

* View Transactions: See all transactions in a sortable list

* Filter: Click filter buttons to view All, Credit, or Debit transactions

* Add Transaction: Click "Add Transaction" to open the modal form

* Export Data: Click "Export CSV" to download current filtered data

* View Summary: Check the summary cards for financial overview

####  Styling Approach
* Tailwind CSS for utility-first styling

* Custom color palette with semantic naming

* Consistent spacing using Tailwind's scale

* Dark mode ready (extensible)

Component-based styling approach

#### Future Enhancements
* Search functionality by description

* Date range filtering

* Transaction editing and deletion

* Charts and visualizations

* Backend integration

* User authentication

* Dark mode toggle

* Transaction categories/tags


📄 License
This project was created as part of the Afripay Frontend Engineer Assessment.

