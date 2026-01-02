import React,{use, useState} from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { transfer } from '../slice/transactionSlice';

export default function Transfer() {

    const dispatch=useAppDispatch();
    const [amount, setAmount] = useState<number>(0);
    const [receicerUsername, setReceiverUsername] = useState<string>('');

    const handleTransfer = () => {
       dispatch(transfer({ amount, receicerUsername }));
    }
  return (
    <div className='p-6 border border-gray-300 max-w-md'>
      <h2 className="text-xl font-bold mb-4">Transfer Money</h2>
      <div className="mb-4">
        <label className="block text-gray-100 mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-100 mb-2">Receiver Username</label>
        <input
          type="text"
          value={receicerUsername}
          onChange={(e) => setReceiverUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={handleTransfer} className='btn-gold'>
     Transfer
      </button>
    </div>
  );
}