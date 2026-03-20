import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Login(props){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        
        axios.post('http://localhost:3001/login', {email, password})
            .then(result => {
                console.log(result)
                if(result.data === "Success"){
                    navigate('/home')
                } else {
                    setError("Invalid credentials. Please try again.")
                    navigate('/logout')
                }
            })
            .catch(err => {
                console.log(err)
                setError("Login failed. Please try again.")
            })
            .finally(() => setLoading(false))
    }
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="font-montserrat text-4xl font-bold text-primary-900 mb-2">Welcome Back</h1>
                    <p className="font-poppins text-primary-700 text-lg">Sign in to your account</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
                    <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 h-1"></div>
                    
                    <div className="p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="group">
                                <label className="font-poppins text-sm font-semibold text-primary-800 block mb-3">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-5 py-3 bg-primary-50 text-primary-900 placeholder-primary-400 rounded-xl border-2 border-primary-200 focus:outline-none focus:border-secondary-400 focus:ring-2 focus:ring-secondary-200 transition duration-300 font-poppins"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="group">
                                <label className="font-poppins text-sm font-semibold text-primary-800 block mb-3">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-5 py-3 bg-primary-50 text-primary-900 placeholder-primary-400 rounded-xl border-2 border-primary-200 focus:outline-none focus:border-secondary-400 focus:ring-2 focus:ring-secondary-200 transition duration-300 font-poppins"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                                    <p className="font-poppins text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Forgot Password Link */}
                            <div className="flex justify-end">
                                <Link 
                                    to="/forgot" 
                                    className="font-poppins text-secondary-500 hover:text-secondary-600 text-sm font-semibold transition duration-300"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 disabled:opacity-50 text-white font-montserrat font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg mt-8"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-primary-200"></div>
                            <span className="font-poppins text-primary-500 text-sm">New user?</span>
                            <div className="flex-1 h-px bg-primary-200"></div>
                        </div>

                        {/* Sign Up Link */}
                        <Link 
                            to="/register"
                            className="w-full block text-center bg-primary-100 hover:bg-primary-200 text-primary-900 font-poppins font-semibold py-3 px-6 rounded-xl transition duration-300"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center mt-6 font-poppins text-primary-700 text-sm">
                    Secure login with encryption
                </p>
            </div>
        </div>
    );
}

export default Login;