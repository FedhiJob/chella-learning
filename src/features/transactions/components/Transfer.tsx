import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { transfer } from '../slice/transactionSlice';
import type { RootState } from '../../../store/store';
import { Send } from 'lucide-react';

export default function Transfer() {
    const dispatch = useAppDispatch();
    const { transferLoading, error } = useAppSelector((state: RootState) => state.transaction);
    const [amount, setAmount] = useState<number>(0);
    const [receiverUsername, setReceiverUsername] = useState<string>('');

    const handleTransfer = () => {
       if (amount > 0 && receiverUsername.trim()) {
         dispatch(transfer({ amount, receicerUsername: receiverUsername }));
       }
    };

  return (
    <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Send className="text-[#FFD700]" size={24} />
        <h2 className="text-2xl font-bold font-montserrat">Transfer Money</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2 text-sm font-medium">Amount (ETB)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#FFD700] focus:outline-none transition-colors"
            placeholder="Enter amount"
            min="1"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm font-medium">Receiver Username</label>
          <input
            type="text"
            value={receiverUsername}
            onChange={(e) => setReceiverUsername(e.target.value)}
            className="w-full p-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#FFD700] focus:outline-none transition-colors"
            placeholder="Enter username"
          />
        </div>

        <button
          onClick={handleTransfer}
          disabled={transferLoading || amount <= 0 || !receiverUsername.trim()}
          className="w-full btn-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {transferLoading ? 'Transferring...' : 'Transfer Money'}
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
