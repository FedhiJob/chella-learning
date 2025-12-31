import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { registerUser } from '../slice/authSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Eye, EyeOff, Lock, PersonStanding, User } from 'lucide-react';
export default function Register() {
    const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector((state: any) => state.auth);

    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [refferedBy, setRefferedBy] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (step === 1) {
      if (!username || !password || !confirmPassword) {
        setErrorMessage("Please fill in all fields")
        return
      }
      if (password.length < 4) {
        setErrorMessage("Password must be at least 4 characters")
        return
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match")
        return
      }
      setErrorMessage("")
      setStep(2)
    } else {
        const response = await dispatch(registerUser({ fullName, username, password ,refferedBy }));

        console.log(response);
        if (response.meta.requestStatus == "fulfilled") {

            navigate('/login');
        }
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
                    <p className="text-gray-400">Join and earn rewards today</p>
                </div>


                <div className="flex gap-2 mb-8">
                    <div
                        className={`flex-1 h-1 rounded-full transition-colors ${step >= 1 ? "bg-[#FFD700]" : "bg-gray-700"}`}
                    ></div>
                    <div
                        className={`flex-1 h-1 rounded-full transition-colors ${step >= 2 ? "bg-[#FFD700]" : "bg-gray-700"}`}
                    ></div>
                </div>


                <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold font-montserrat mb-6">{step === 1 ? "Create Account" : "Referral Code"}</h2>

                    {error && (
                        <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}
                          {errorMessage && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {errorMessage}
            </div>
          )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 ? (
                            <>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                    <div className="relative">
                                        <PersonStanding className="absolute left-3 top-3.5 text-gray-500" size={20} />
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Write your full name"
                                            className="w-full bg-[#2A2A2A] border border-gray-700 text-white placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#FFD700] transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3.5 text-gray-500" size={20} />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Choose your username"
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
                                            placeholder="Min 4 characters"
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

                              
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm password"
                                            className="w-full bg-[#2A2A2A] border border-gray-700 text-white placeholder-gray-500 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:border-[#FFD700] transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                              
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Referral Code (Optional)</label>
                                    <input
                                        type="text"
                                        value={refferedBy}
                                        onChange={(e) => setRefferedBy(e.target.value)}
                                        placeholder="If you have a referral code"
                                        className="w-full bg-[#2A2A2A] border border-gray-700 text-white placeholder-gray-500 rounded-lg py-3 px-4 focus:outline-none focus:border-[#FFD700] transition-colors"
                                    />
                                </div>

                              
                                <div className="bg-[#2A2A2A] border border-gray-700 rounded-lg p-4">
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-[#FFD700]">Get 100 ETB</span> signup bonus when you complete
                                        registration!
                                    </p>
                                </div>
                            </>
                        )}


                        <div className="flex gap-3 pt-4">
                            {step === 2 && (
                                <button type="button" onClick={() => setStep(1)} className="flex-1 btn-dark">
                                    Back
                                </button>
                            )}
                            <button type="submit" className="flex-1 btn-gold">
                                {step === 1 ? "Next Step" : "Create Account"}
                            </button>
                        </div>
                    </form>
               

           



                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#1A1A1A] text-gray-500">Already registered?</span>
                        </div>
                    </div>


                    <Link to="/login">
                        <button className="w-full btn-dark">Login to Account</button>
                    </Link>
                </div>


                <p className="text-center text-gray-500 text-sm mt-6">By registering, you agree to our Terms & Conditions</p>
            </div>
        </>
    );
}
