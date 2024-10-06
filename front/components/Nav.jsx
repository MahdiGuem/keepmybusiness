"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { openpage } from '@app/actions';
import { useRouter } from 'next/navigation';

{/*import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
    after design review check if we're going to use next-auth or another lib*/}

const Nav = () => {
   
    
    /*icons*/
    const request_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
    </svg>
    const clients_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
    const edit_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
    const about_icon =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>
  
    const preview_icon =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
  </svg>
    const products_icon =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>
    const contact_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
  
    const[email,setEmail] = useState("")
    const[isUserLoggedIn,setIsUserLoggedIn] = useState(false)
    const[token, setToken] = useState("")
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('email');
        console.log(storedToken)
        if (storedToken) {
            setToken(storedToken);
            setEmail(storedEmail);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        setIsUserLoggedIn(false)
        setEmail('')
        router.push("/")
    }
  return (
    <nav className="nav bg-white">
        <div className = "flex">
            <Link href="/" className="flex gap-2 flex-center pr-2">
                <Image 
                    src="/images/logo.png"
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">ERPMaster</p>
            </Link>
            <div className="flex items-center">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 items-center">
                        <p>|</p>
                        <Link href="/admin/requests" className="flex">
                        {request_icon}
                        <p className="sm:flex hidden">Requests</p>
                        </Link>
                        <p>|</p>
                        <Link href="/admin/clients" className="flex">
                            {clients_icon}
                            <p className="sm:flex hidden">Clients</p>
                        </Link>
                        <p>|</p>
                        <Link href="/admin/edit" className="flex">
                            {edit_icon}
                            <p className="sm:flex hidden">Edit</p>
                        </Link>
                        <p>|</p>
                    </div>

                ): (
                    <div className="flex gap-3 items-center">
                        <p>|</p>
                        <Link href="#about-section" className="flex">
                            {about_icon}
                            <p className="sm:flex hidden">About</p>
                        </Link>
                        <p>|</p>
                        <Link href="#preview-section" className="flex">
                            {preview_icon}
                            <p className="sm:flex hidden">Preview</p>
                        </Link>
                        <p>|</p>
                        <Link href="#products-section" className="flex">
                            {products_icon}
                            <p className="sm:flex hidden">Products</p>
                        </Link>
                        <p>|</p>

                        <Link href="#contact-section" className="flex green_btn">
                            {contact_icon}
                            <p className="sm:flex hidden">Contact Us</p>
                        </Link>
                        
                    </div>
                )}
            </div>
        </div>
        {isUserLoggedIn ? (
            <div className="flex items-center gap-1">
                <p>{email}</p>
                <button type="button" onClick={()=>{logout()}} className="green_btn">
                    Sign Out
                </button>
            
            </div>
        ) : (
            <div className="flex items-center gap-3">
                <Link href="/admin/login" className="flex">
                            <p className='underline'>Login</p>
                        </Link>
            </div>

        )}
        
    </nav>
  )
}

export default Nav