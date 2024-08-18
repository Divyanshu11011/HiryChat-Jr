// src/components/SignIn.tsx
import React, { useState } from 'react';
import { FaMobileAlt, FaEnvelope } from 'react-icons/fa';

const SignIn: React.FC<{ onSignInSuccess: (user: any) => void }> = ({ onSignInSuccess }) => {
    const [method, setMethod] = useState<'phone' | 'email' | null>(null);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [name, setName] = useState('');
    const [showNameInput, setShowNameInput] = useState(false);

    const handleSendOtp = async () => {
        const url = method === 'phone'
            ? `${import.meta.env.VITE_BACKEND_URL}/send-otp`
            : `${import.meta.env.VITE_BACKEND_URL}/send-email-otp`;
        const payload = method === 'phone' ? { phone } : { email };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (response.ok) {
                setOtpSent(true);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        const url = method === 'phone'
            ? `${import.meta.env.VITE_BACKEND_URL}/verify-otp`
            : `${import.meta.env.VITE_BACKEND_URL}/verify-email-otp`;
        const payload = method === 'phone' ? { phone, otp } : { email, otp };
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
    
            if (response.ok) {
                // Store the JWT and user data in localStorage
                localStorage.setItem('token', data.token); // JWT for session
                localStorage.setItem('user', JSON.stringify(data.user)); // Store user data for UI
    
                onSignInSuccess(data.user); // Redirect or move forward
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert('OTP verification failed');
        }
    };
    

    const handleSubmitName = () => {
        // Submit the name and complete profile
        onSignInSuccess({ name }); // Pass user data to main app
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded-lg w-96">
                {!otpSent ? (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => setMethod('phone')}
                                className={`py-2 px-4 rounded-md border flex items-center justify-center space-x-2 ${method === 'phone' ?  'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}'
                                    }`}
                            >
                                <FaMobileAlt />
                                <span>Continue with Phone</span>
                            </button>
                            <button
                                onClick={() => setMethod('email')}
                                className={`py-2 px-4 rounded-md border flex items-center justify-center space-x-2 ${method === 'email' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}
                                    }`}
                            >
                                <FaEnvelope />
                                <span>Continue with Email</span>
                            </button>
                            {method && (
                                <div>
                                    {method === 'phone' ? (
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter phone number (+1234567890)"
                                            className="border border-gray-300 p-2 w-full mb-4 rounded-md"
                                        />
                                    ) : (
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="border border-gray-300 p-2 w-full mb-4 rounded-md"
                                        />
                                    )}
                                    <button
                                        onClick={handleSendOtp}
                                        className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
                                    >
                                        Send OTP
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="border border-gray-300 p-2 w-full mb-4 rounded-md"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

                {showNameInput && (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4 text-center">Complete Your Profile</h2>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="border border-gray-300 p-2 w-full mb-4 rounded-md"
                        />
                        <button
                            onClick={handleSubmitName}
                            className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
                        >
                            Complete Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignIn;
