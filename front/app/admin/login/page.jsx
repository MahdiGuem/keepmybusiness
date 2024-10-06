"use client";

import { useState } from 'react';
import {useRouter} from 'next/navigation';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = async (e) => {
    console.log('logging in')
    e.preventDefault();
    try {
        const res = await fetch(`http://localhost:8080/admin/login`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            "email": email,
            "password": password,
        }),
        });
        const token = await res.text();
        if (res.ok){
            localStorage.setItem('token', token);
            localStorage.setItem('email',email)
            console.log(token);
            router.refresh()
            router.push("requests")
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">

      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold">Admin Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="border p-2 rounded focus:outline-none" 
              required 
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="border p-2 rounded focus:outline-none" 
              required 
            />
          </div>

          <button type="submit" className="w-full py-2 green_btn">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 italic">
          (If you don't have an account, contact the devs)
        </p>
      </div>
    </div>
  );
};

export default Login;
