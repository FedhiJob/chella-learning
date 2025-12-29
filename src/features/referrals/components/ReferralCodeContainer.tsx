import { Check, Copy, Share2 } from 'lucide-react';
import React, { useState,useEffect } from 'react';
import { useAppSelector,useAppDispatch } from '../../../hooks/hooks';
import type { RootState } from '../../../store/store';

export default function ReferralCodeContainer() {
      const [copied, setCopied] = useState(false)
      
        
         const {referralCode}=useAppSelector((state: RootState) => state.referral);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode ? referralCode : "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
     <div className="bg-black rounded-xl p-8">
        <h2 className="text-2xl font-bold font-montserrat mb-6">Your Referral Code</h2>

        <div className="bg-[#1A1A1A] border border-[#FFD700]/50 rounded-xl p-8 mb-6">
          <p className="text-gray-400 text-sm mb-3">Share this code with your friends</p>
          <div className="flex items-center gap-3 bg-[#2A2A2A] p-4 rounded-lg">
            <code className="font-mono text-2xl font-bold text-[#FFD700] flex-1">{referralCode}</code>
            <button
              onClick={handleCopyCode}
              className="bg-[#FFD700] hover:bg-yellow-300 text-black p-3 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={20} />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={20} />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

      
        <div className="flex gap-3 flex-wrap">
          <button className="btn-gold flex items-center gap-2">
            <Share2 size={18} />
            Share on Twitter
          </button>
          <button className="btn-gold flex items-center gap-2">
            <Share2 size={18} />
            Share on WhatsApp
          </button>
          <button className="btn-dark flex items-center gap-2">
            <Share2 size={18} />
            Share Link
          </button>
        </div>
      </div>
  );
}
