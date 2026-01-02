import React,{useEffect} from 'react';
import { BellIcon } from 'lucide-react';
import { useAppDispatch,useAppSelector } from '../../../hooks/hooks';
import { getMyProfile } from '../../Profile/slice/profileSlice';
import type { RootState } from '../../../store/store';
export default function Header() {


    
        const dispatch = useAppDispatch();
        const { loading, error, profile } = useAppSelector((state: RootState) => state.profile);
    
        useEffect(() => {
    
            dispatch(getMyProfile())
        }, [])
    return (
        <div className='flex justify-between items-center px-6 py-3 bg-gray-900'>
            <div className='text-white'>
                Balance: <span className='text-shadow-yellow-500'>
                {!loading && profile ? `${profile.amount} ETB` : 'Loading...'}
                </span>

            </div>


            <div className='gap-4 flex items-center'>
                <div>
                    <BellIcon size={24} className='text-gray-300 cursor-pointer' />

                </div>
                <div>
                    <select name="money" id="">
                        <option value="USD">USD</option>
                        <option value="ETB">ETB</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>

                <div className='flex gap-2'>
                    <div className='bg-yellow-200 h-10 justify-center items-center w-10 bg rounded-full p-1'>
                         CH
                    </div>

                    <div>
                        <span className='text-white font-semibold'>     {!loading && profile ? `${profile.fullName} ` : 'Loading...'}
</span>
                    </div>
                </div>
            </div>

        </div>
    );
}