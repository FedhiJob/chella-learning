import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getMyTransactions } from '../slice/transactionSlice';
import type { RootState } from '../../../store/store';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react';

export default function TransactionList() {
  const dispatch = useAppDispatch();
  const { transactions, loading, error } = useAppSelector((state: RootState) => state.transaction);
        const {  profile } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getMyTransactions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700]"></div>
          <span className="ml-3 text-gray-400">Loading transactions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    
    return (
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8">
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <Clock size={48} className="mx-auto" />
          </div>
          <p className="text-red-400 font-semibold">Error loading transactions</p>
          <p className="text-gray-400 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'credit':
      case 'received':
        return <ArrowDownLeft className="text-green-400" size={20} />;
      case 'debit':
      case 'sent':
        return <ArrowUpRight className="text-red-400" size={20} />;
      default:
        return <CheckCircle className="text-[#FFD700]" size={20} />;
    }
  };

  const getAmountColor = (type: string, amount: number) => {
    if (type.toLowerCase().includes('credit') || type.toLowerCase().includes('received')) {
      return 'text-green-400';
    }
    if (type.toLowerCase().includes('debit') || type.toLowerCase().includes('sent')) {
      return 'text-red-400';
    }
    return 'text-white';
  };

  return (  
    <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8">
      <h2 className="text-2xl font-bold font-montserrat mb-6">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-400 text-center py-12">No transactions found.</p>       
      ) : (
        <ul className="space-y-6 max-h-[500px] overflow-y-auto">
          {transactions.map((tx) => (   
            <li key={tx.id} className="flex items-center justify-between">  

              <div className="flex items-center gap-4">
             
                <div>

                  <p className="text-white font-semibold">{tx.senderUsername===profile?.username ? tx.receiverFullName: tx.senderFullName  }</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(tx.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <div className={`font-montserrat font-bold text-lg ${ tx.senderUsername===profile?.username ? 'text-red-400' : 'text-green-400' }`}>
                {tx.senderUsername===profile?.username  ? '- ' : '+ '} ETB {tx.amount.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
