import Transfer from '../components/Transfer';
import React from 'react';

import TransactionList from '../components/TransactionList';

export default function TransactionsPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-montserrat mb-2">Transactions</h1>
        <p className="text-gray-400">View your transaction history and transfer funds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransactionList />
        <Transfer />
      </div>
    </div>
  );
}
