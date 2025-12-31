import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { loginUser } from '../slice/authSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
export default function Login() {
    const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector((state: any) => state.auth);

  const [showPassword, setShowPassword] = useState(false)


    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault();
        const response =await dispatch(loginUser({ username, password }));
  console.log(response)
        if (response.meta.requestStatus == "fulfilled") {

            navigate('/dashboard');

        }
    }


    return (
       <>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md">
      
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold font-montserrat mb-2">
              <span className="text-[#FFD700]">Chella</span>
            </h1>
          </Link>
          <p className="text-gray-400">Welcome back to your rewards</p>
        </div>

     
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold font-montserrat mb-6">Login to Account</h2>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-500" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-[#2A2A2A] border border-gray-700 text-white placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#FFD700] transition-colors"
                />
              </div>
            </div>

       
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#2A2A2A] border border-gray-700 text-white placeholder-gray-500 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:border-[#FFD700] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

         
            <div className="text-right">
              <button type="button" className="text-sm text-[#FFD700] hover:text-yellow-300 transition-colors">
                Forgot Password?
              </button>
            </div>

    
            <button type="submit" className="w-full btn-gold mt-6">
              Login to Chella
            </button>
          </form>

         
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1A1A1A] text-gray-500">Don't have an account?</span>
            </div>
          </div>

         
          <Link to="/register">
            <button className="w-full btn-dark">Create New Account</button>
          </Link>
        </div> 

     
        <p className="text-center text-gray-500 text-sm mt-6">By logging in, you agree to our Terms & Conditions</p>
      </div>
    </>
    );
}
